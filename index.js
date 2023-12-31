const express = require('express')
var bodyParser = require('body-parser')
const supabaseClient = require('@supabase/supabase-js')
const app = express()
const port = 3000;
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

const supabaseUrl = 'https://tmmlazjuztjwdmuocluy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbWxhemp1enRqd2RtdW9jbHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyNjk0NDMsImV4cCI6MjAxNTg0NTQ0M30.L94xNIohd1ntZEw5TYMswRbg3PsA28p7EWDCMPGu9zc';
const supabase = supabaseClient.createClient(supabaseUrl,supabaseKey);0

app.get('/',(req,res) =>{
   res.sendFile('public/INST377-Week10.html',{root:__dirname})
})

app.get('/customers', async (req, res) => {
    console.log(`Getting Customer`)

    const {data, error} = await supabase
        .from('Customers')
        .select();

    if(error) {
        console.log(error)
    } else if(data) {
        res.send(data)
    }
})

app.post('/customer', async (req, res) => {
    console.log('Adding Customer')

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var state = req.body.state;

    const {data, error} = await supabase
        .from('Customers')
        .insert([
            {'cust_first_name': firstName, 'cust_last_name': lastName, 'cust_state': state}
        ])
        .select();
    console.log(error)    
    console.log(data)
    res.header('Content-type', 'application/json')
    res.send(data)
})
app.listen(port, () =>{
    console.log('APP IS ALLIVEEEEEE')
})