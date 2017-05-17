// add on
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');





const app = express();

// Configuration
app.set('view engine', 'ejs');

// Middlewares
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'development']
}));

app.use(bodyParser.urlencoded({
  extended: true
}));



// urls list
const urls = [{
  short: 'b2xVn2',
  long: 'http://www.lighthouselabs.ca',
  user_id: '1'
},{
  short:'9sm5xK',
  long: 'http://www.google.com',
  user_id: '2'
}];


//user list
const user = [{
  id: 1,
  email: '1@1',
  password: '$2a$10$dEhzPIMAcC7evMah9n/W3ujAZfsTfBzySaoO.eiVqCefLLFckPH6a'

},{
  id: 2,
  email: 'asd@asd',
  password: '$2a$10$2B7Rta2A4ghkjV5FW0JM/uUZgbQ2VIQ/DCY6AUxh/07AeVrbyXgCC'
}];


//login
app.get('/login', (req, res) => {
  let email = req.session.email;
  res.render('urls_login', { email: req.session.email, user: user});
});

// cookies!!!
app.post('/login', (req, res) => {
  for (const userIndex in user){
    if(user[userIndex].email === req.body.email && bcrypt.compareSync(req.body.password, user[userIndex].password)){
      req.session.email = req.body.email;
      res.redirect('/');
      return;
    }
  }
  res.status(401).send('bad credentials');
});


// registration
app.get('/register', (req, res) => {
  res.render('url_regestration', {email: req.session.email, user: user});
});

// registration handler
app.post('/register', (req, res) => {
  for (const userIndex in user){

    if(user[userIndex].email === req.body.email){
      res.status(400).send('User already exists');
      return;
    }
  }
  const hash = req.body.password
  const hashedPassword = bcrypt.hashSync(hash, 10);
  const newuser = {
    password: hashedPassword,
    email: req.body.email,
    id: 3
  }
  user.push(newuser);
  res.redirect('/login');
});


// Root route
app.get('/', (req, res) => {
  let email = req.session.email;
  res.render('urls_test', { email: req.session.email});
});

// logout
app.get('/logout', ( req, res) => {
  let email =req.sessions.email;
  res.render('urls_logout', { email: req.session.email });
});
// delete cookies
app.post('/logout', (req, res) => {
  let { email, password } = req.body;
  req.session.email = req.body.email;
  res.redirect('/login');
});

// Search
app.get('/urls', (req, res) => {
  res.render('urls_index', { email: req.session.email, urls: urls, user: user});
});

// Create
app.post('/urls', (req, res) => {
  console.log(req.body);
  urls.push(req.body)

  res.redirect('/urls');
});

app.get('/urls/create', (req, res) => {
  if(req.session.email) {
    let userUrls =[];
    for (let urlsId in urls){
      if (urls[urlsId].email === req.session.email){
        userUrls.push(urls[urlsId]);
      }
    }
    const email = req.session.email;
    res.render('urls_userindex', {email: req.session.email, urls: userUrls})
  }
});

app.post('/urls/create', (req, res) => {
    if(req.session.email) {
      let userUrls =[];
      for (let urlsId in urls){
        if (urls[urlsId].email === req.session.email){
          userUrls.push(urls[urlsId]);
        }
      }
    res.redirect('/urls/create');
  }
});

// Retrieve
app.get('/urls/:short', (req, res) => {
  let url = urls.find(m => m.short === req.params.short);
  if (!urls) {
    res.status(404);
    res.send('URL not found');
    return;
  }
  res.render('urls_show', { email: req.session.email, url: url });
});

// Replace
app.post('/urls/:short', (req, res) => {
  let url = urls.find(m => m.short === req.params.short);
  if (!urls) {
    res.status(404);
    res.send('URL not found');
    return;
  }
  url.long = req.body.long;
  res.redirect('/urls');
});

// Destroy
app.post('/urls/:short/delete', (req, res) => {
  let urlIndex = urls.findIndex(m => m.short === req.params.short);
  urls.splice(urlIndex, 1);
  res.redirect('/urls');
});





// server port
app.listen(8080, () => {
  console.log('it\'s listening');
});







