const express = require('express');
const router = express.Router();

const sql = require('../utils/sql');

router.get('/', (req, res) => {
    // should really get the user data here and then fetch it thru, but let's try this asynchronously
    console.log('at the main route');

    let query = "SELECT * FROM tbl_card";

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        console.log(result); // should see objects wrapped in an array

        result[0].SocialMedia = result[0].SocialMedia.split(',').map(function(item){
            item = item.trim();

            return item;
        });
        console.log('after spliiting: ', result[0]);

        // render the home view with dynamic data
        res.render('home', { person: result });
    })
})

router.get('/:id', (req, res)=>{ //":__" is a dynamic placeholder ***** important
    console.log('Hit dynamic route.')
    console.log(req.params.id)

    //sql query
    let query = `SELECT * FROM tbl_card WHERE ID="${req.params.id}"`; //profID

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        console.log(result); // should see objects wrapped in an array

        result[0].SocialMedia = result[0].SocialMedia.split(',').map(function(item){
            item = item.trim();

            return item;
        });
        //console.log('after spliiting: ', result[0]);

        // rendering results from click (see main.js)
        res.json(result);
    })
}) 

module.exports = router;