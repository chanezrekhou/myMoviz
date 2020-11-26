var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }

   mongoose.connect('mongodb+srv://admin:BootcampCapsule@cluster0.zx4n4.mongodb.net/mymoviz?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );
   