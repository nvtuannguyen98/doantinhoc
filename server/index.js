const http = require('http')
const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const { CloudinaryService } = require('./services/cloudinary.service')

require('./mongoose-models/setup')

let error
let user

app.use(express.static("public"))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json 
app.use(bodyParser.json())

// use cookie parser 
app.use(cookieParser())

app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
    },
}))

const hostname = '127.0.0.1' // localhost
const port = 3000

// Render HTML
app.get('/', (req, res) => {
    res.render('index', { title: 'doantinhoc' })
})

app.get('/sign-in', (req, res) => {
    res.render('sign-in', { title: 'doantinhoc' })
})

app.get('/sign-up', (req, res) => {
    res.render('sign-up', { title: 'doantinhoc' })
})

app.get('/admin', (req, res) => {
    res.render('admin-dashboard', { title: 'doantinhoc' })
})
app.get('/employee', (req, res) => {
    res.render('employee', { title: 'doantinhoc' })
})

const { EmployeeModel } = require('./mongoose-models')

// APIs

app.post('/api/sign-up', async (req, res) => {
    const { email, name, phoneNumber, password, address } = req.body

    // Add into database
    const employee = await EmployeeModel.create({
        email, name, phoneNumber, password, address
    })

    res.json(employee)
})

app.post('/api/sign-in', async (req, res) => {
    const { email, password } = req.body

    // Add into database
    const employee = await EmployeeModel.findOne({
        email, password
    })

    if (employee) {
        res.json({
            isSuccess: true,
            employee,
        })
        return
    } else {
        res.json({
            isSuccess: false,
        })
        return
    }

})


app.post('/api/categories',
    async (req, res, next) => {

        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).json({
                message: 'No file was uploaded.',
            })
            return
        }

        let files = req.files.files
        if (!Array.isArray(files)) {
            req.files.files = [files]
        }

        next()
    },
    async (req, res) => {

        const { name } = req.body

        try {
            const files = req.files.files

            // Upload to Cloudinary
            const cloudinaryFiles = await Promise.all(files.map(async file => {
                return CloudinaryService.uploadFile(
                    `data:${file.mimetype}base64,${file.data.toString('base64')}`,
                    'avatar'
                )
            }))

            res.json({cloudinaryFiles})

        } catch (e) {
            console.warn('[ERROR] uploadImage', e)
        }
    })

app.listen(port)

console.log('Server is running on port ', port)