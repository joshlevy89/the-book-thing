function user(app,db) {

this.update_user_details = function(req,res) {
    var username = req.body.user.username; 
    var fieldName = req.body.fieldName;        
    var value = req.body.value;   
       
    var allUsers = db.collection('allUsers');

    allUsers.update({username:username}, { 
      $set: {
            'username': username,
            [fieldName]: value
        }}, { upsert :true }
     )
    res.end();
}

this.retrieve_user_details = function(req,res){
    var username = req.body.user.username; 
    var allUsers = db.collection('allUsers');
    allUsers.find({username:username}).toArray(function(err,docs){
      if (docs.length === 0){
        res.send({
          message: 'no_details_yet'
          })
        return;
      }
      doc = docs[0];
      res.send({
        message: 'got_details_successfully',
        details: doc
      })
    })
}

}

module.exports = user