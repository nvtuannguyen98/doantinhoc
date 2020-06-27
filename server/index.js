const http = require('http')
const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const { CloudinaryService } = require('./services/cloudinary.service')
const ObjectId = require('mongoose').Types.ObjectId

require('./mongoose-models/setup')

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
app.get('/', async (req, res) => {
    const categories = await CategoryModel.find({}).lean()
    res.render('index', { title: 'doantinhoc', categories })
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

const { 
    EmployeeModel, 
    CategoryModel,
 } = require('./mongoose-models')
const { isObject } = require('util')

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

        const { name } = req.body

        try {

            if (!req.files || Object.keys(req.files).length === 0) {
                res.status(400).json({
                    message: 'No file was uploaded.',
                })
                return
            }

            const file = req.files.file
            if (Array.isArray(file)) {
                res.status(400).json({
                    message: 'Only 1 picture is allowed.',
                })
                return
            }

            // Upload to Cloudinary
            const cloudinaryFile = await CloudinaryService.uploadFile(
                `data:${file.mimetype};base64,${file.data.toString('base64')}`,
                'avatar'
            )

            const category = await CategoryModel.create({
                name,
                url: cloudinaryFile.url,
            })

            res.json(category)

        } catch (e) {
            console.warn('[ERROR] uploadImage', e)
        }

    }
)

app.put('/api/categories',
    async (req, res, next) => {

        const { id, name } = req.body

        try {

            if (!req.files || Object.keys(req.files).length === 0) {
                res.status(400).json({
                    message: 'No file was uploaded.',
                })
                return
            }

            if (!ObjectId.isValid(id)) {
                res.status(400).json({
                    message: 'Invalid category id.',
                })
                return
            }
            const category = await CategoryModel.findOne({
                _id: new ObjectId(id),
            })

            if (!category) {
                res.status(400).json({
                    message: 'Invalid category id.',
                })
                return
            }

            const file = req.files.file
            if (Array.isArray(file)) {
                res.status(400).json({
                    message: 'Only 1 picture is allowed.',
                })
                return
            }

            // Upload to Cloudinary
            const cloudinaryFile = await CloudinaryService.uploadFile(
                `data:${file.mimetype};base64,${file.data.toString('base64')}`,
                'avatar'
            )

            await CategoryModel.updateOne({
                _id: new ObjectId(id),
                name,
                url: cloudinaryFile.url,
            })

            const newCategory = await CategoryModel.findOne({
                _id: new ObjectId(id),
            })

            res.json(newCategory)

        } catch (e) {
            console.warn('[ERROR] uploadImage', e)
        }

    }
)

app.listen(port)

console.log('Server is running on port ', port)