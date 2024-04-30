var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Get the SQL module and pool from app.locals
  const sql = req.app.locals.sql;
  const pool = req.app.locals.pool;

  // Query to select all records from the Actors table
  const query = 'SELECT * FROM dbo.Actors';

  // Execute the query
  pool.query(query, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).send('Internal Server Error');
    }
    else {
      console.info('Successfully loaded SQL: ' + result.recordset);
    }
    
    // Transforming data
    const actors = result.recordset.map(actor => {
      return {
        id: actor.ActorID,
        name: actor.FirstName,
        // Add more fields if needed
      };
    });

    // Render the index page with the retrieved data
    res.render('index', { title: 'Actors', actors: actors });
  });
});

module.exports = router;
