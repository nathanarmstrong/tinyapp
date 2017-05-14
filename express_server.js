
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();

// Configuration
app.set('view engine', 'ejs');

// Middlewares
app.use(cookieParser("test"));

app.use(bodyParser.urlencoded({
  extended: true
}));



// Root route
app.get('/', (req, res) => {
  const email = req.signedCookies.email;
  res.render('urls_test', { email: req.cookies.email });
});

//login
app.get('/login', (req, res) => {
  res.render('urls_login', {email: req.cookies.email });
});

// cookies!!!
app.post('/login', (req, res) => {
  const { email, passowrd } = req.body;
  res.cookie('email', req.body.email);
  res.redirect('/')
});

// logout
app.get('/logout', ( req, res) => {
  const email =req.signedCookies.email;
  res.render('urls_logout', { email: req.cookies.email });
});
// delete cookies
app.post('/logout', (req, res) => {
  const { email, passowrd } = req.body;
  res.clearCookie('email', req.body.email);
  res.redirect('/login')
});


// urls list
const urls = [{
  short: 'b2xVn2',
  long: 'http://www.lighthouselabs.ca'
},{
  short:'9sm5xK',
  long: 'http://www.google.com'
}];


//user list
const user = [{
  'test': {
    id: 'test',
    email: 'asd@asd',
    password: 'asd'
  },
  'test2': {
    id: 'test2',
    email: 'asd@asd.asd',
    password: 'asd'
  }
}];


// Search
app.get('/urls', (req, res) => {
  const email = req.signedCookies.email;
  res.render('urls_index', { email: req.cookies.email, urls: urls });
});

// Create
app.post('/urls', (req, res) => {
  console.log(req.body);
  urls.push(req.body);

  res.redirect('/urls');
});

// Retrieve
app.get('/urls/:short', (req, res) => {
  const url = urls.find(m => m.short === req.params.short);
  if (!urls) {
    res.status(404);
    res.send('URL not found');
    return;
  }
  const email = req.signedCookies.email;
  res.render('urls_show', { email: req.cookies.email, url: url });
});

// Replace
app.post('/urls/:short', (req, res) => {
  const url = urls.find(m => m.short === req.params.short);
  if (!urls) {
    res.status(404);
    res.send('URL not found');
    return;
  }
  url.long = req.body.long;
  res.redirect('/urls')
});

// Destroy
app.post('/urls/:short/delete', (req, res) => {
  const urlIndex = urls.findIndex(m => m.short === req.params.short);
  urls.splice(urlIndex, 1);
  res.redirect('/urls');
});

// registration
app.get('/register', (req, res) => {
  res.render('url_regestration')
});


app.post('/register', (req, res) => {
  res.redirect('/login')
});



// server port
app.listen(8080, () => {
  console.log('it\'s listening');
});




// genertat random 6 digig characters

function generateRandomString() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}





