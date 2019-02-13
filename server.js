const express=require('express');
//handlebars
const hbs=require('hbs');
const fs=require('fs');

const port= process.env.PORT|| 3000;

var app= express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


//middleware to track server
app.use((req,res,next)=>{
	var now= new Date().toString();
	var log=`${now}: ${req.method} ${req.url}`;
	console.log(log);
	//append text to files require callback to control errors
	fs.appendFile('server.log', log+'\r\n',(err)=>{
		if(err){
			console.log('Unable to append to server log.');
		}
	});
	next();
});

//middleware if server fails
// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs',{
// 		pageTitle:'Maintenance Page',
// 		welcomeEntry:'fudeu capitão!!!!'
// 	});
// });

app.use(express.static(__dirname + '/public'));

//pass function without arguments
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

//pass function with arguments
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req,res)=>{

	res.render('home.hbs',{
		pageTitle:'Home Page',
		welcomeEntry:'Good Morning Vietname',
		//currentYear:new Date().getFullYear()	
	});

	// res.send('<h1>Hello express!</h1>');
	// res.send({
	// 	name:'Rui',
	// 	likes:[
	// 		'Skydive',
	// 		'Run',
	// 		'Travel'
	// 	]
	// });
});

app.get('/about',(req,res)=>{
	// res.send('<h1>Hello express!</h1>')
	res.render('about.hbs',{
		pageTitle:'About Page',
		//currentYear:new Date().getFullYear()
	});	
});

app.get('/bad',(req,res)=>{
	res.send({
		Error:'Missing path!'
	});
});

app.listen(port,()=>{
	console.log(`Server is in port ${port}`);
	//console.log(`pid ${process.pid}`);
});