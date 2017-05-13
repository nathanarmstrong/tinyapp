const express = require('express');


const app = express();

// Configuration
app.set('view engine', 'ejs');

// Middlewares


// Root route
app.get('/', (req, res) => {
  res.render('index', {
    name: 'dave'
  });
});

// Marsupial routes
const marsupials = [{
  name: 'Kangaroo',
  size: 'big'
}, {
  name: 'Koala',
  size: 'wee'
}];

// Search marsupials
app.get('/marsupials', (req, res) => {
  res.render('marsupials_index', {
    marsupials: marsupials
  });
});

// Create a marsupial
app.post('/marsupials', (req, res) => {
  console.log(req.body);
  marsupials.push(req.body);
  // Bad - never render in a post, ever, don't do it please, please
  // res.render('marsupials_index', {
  //   marsupials: marsupials
  // });

  // Good - always redirect from posts
  res.redirect('/marsupials');
});

// Retrieve a marsupial
app.get('/marsupials/:name', (req, res) => {
  const marsupial = marsupials.find(m => m.name === req.params.name);
  if (!marsupial) {
    res.status(404);
    res.send('Marsupial not found');
    return;
  }
  res.render('marsupials_show', {
    marsupial: marsupial
  });
});

// Replace a marsupial
app.post('/marsupials/:name', (req, res) => {
  const marsupial = marsupials.find(m => m.name === req.params.name);
  if (!marsupial) {
    res.status(404);
    res.send('Marsupial not found');
    return;
  }
  marsupial.name = req.body.name;
  marsupial.size = req.body.size;
  res.redirect(`/marsupials/${marsupial.name}`)
});

// Destroy a marsupial
app.post('/marsupials/:name/delete', (req, res) => {
  const marsupialIndex = marsupials.findIndex(m => m.name === req.params.name);
  marsupials.splice(marsupialIndex, 1);
  res.redirect('/marsupials');
});

app.listen(8080, () => {
  console.log('it\'s listening');
});