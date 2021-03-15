const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const fs = require('../index')
//fs.fs

router.post('/', (req, res) => {

    const array =[]
    let dataLength;
    let sort;

    // sortBy
    // sortDirection
    // pageSize
    // pageIndex
    // dataLength
    //previousPage
    // searchBy

    if(req.body) {
        sort = req.body
        if(!sort.previousPage) {
            let items = []
            fs.fs.collection('user-info').orderBy(sort.sortBy, sort.sortDirection).get()
                .then(data => {
                    data.forEach( item => {
                        items.push(item.data())
                    })

                    // filter out if search item is available
                    if(sort.searchBy) {
                        items = searchBy(items)
                    } else {
                        // console.log('no search item')
                    }
                    dataLength = items.length

                    // if searched items array length is greater than the page size
                    if((+sort.pageSize * +sort.pageIndex) < dataLength) {
                        items = items.slice((+sort.pageSize * +sort.pageIndex), ((+sort.pageSize * +sort.pageIndex) + +sort.pageSize))
                    } 

                    creatObject(items)
                    res.status(200).json({data: array, dataLength: dataLength})
                }).catch(error => {
                    // send server error
                    // console.log(error);
                    res.status(500).json({message: 'Server Error'})
                })
           
        } else {
            // previous page
            let items = []
            // reverse sort items to get proper data
            const sortDirection = (sort.sortDirection === 'asc') ? 'desc' : 'asc';
            // console.log('going previous page', sortDirection)

            fs.fs.collection('user-info').orderBy(sort.sortBy, sortDirection).get()
                .then( data => {
                    data.forEach( item => {
                        items.push(item.data())
                    })
                    // filter out if search item is available
                    if(sort.searchBy) {
                        items = searchBy(items)
                    } else {
                        // console.log('no search item')
                    }
                    dataLength = items.length
                    
                    // if searched items array length is greater than the page size
                    if((+sort.pageSize * +sort.pageIndex) < dataLength) {
                        items = items.slice((+sort.pageSize * (+sort.pageIndex + 1)), ((+sort.pageSize * (+sort.pageIndex + 1)) + +sort.pageSize))
                    } 

                    // re sort items according to users expectations
                    items = items.sort((a, b) => {
                        if(sort.sortDirection === 'asc') {
                            // console.log('previous page in asc')
                            return a[sort.sortBy] - b[sort.sortBy]
                        } else {
                            // console.log('previous page in desc')
                            return b[sort.sortBy] - a[sort.sortBy]
                        }
                    })
                    creatObject(items)
                    res.status(200).json({data: array, dataLength: dataLength})

                }).catch(error => {
                    // send server error
                    console.log(error);
                    res.status(500).json({message: 'Server Error'})
                })
            
        }
        
    } else {
        res.status(400).json({message:'No Data Sorting Option was Provided'})
    }


    function creatObject(items) {
        items.forEach(item => {
            array.push(new InfoObject(item.firstName, item.lastName, item.occupation, item.institute, item.uid, item.imageUrl))
        })
    }

    function searchBy(items) {
        const arr = []
        const keyNames = ['firstName', 'lastName', 'institute', 'occupation']
        keyNames.forEach(name => {
            items.forEach(item => {
                if(item[name].toLowerCase().includes(sort.searchBy.toLowerCase())) {
                    if(!arr.includes(item)) {
                        arr.push(item)
                    }
                }
            })
        })
        return arr;
    }
})

class InfoObject {
    constructor(firstName, lastName, occupation, institute, uid, imageUrl) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.occupation = occupation;
        this.institute = institute;
        this.uid = uid;
        this.imageUrl = imageUrl;
    }
}

module.exports = router;