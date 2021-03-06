const mongoose = require('mongoose');





const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "The course must have name"],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, "Must have description"],
    trim: true,
    maxlength: [2000, "A description name must have less or equal then 50 characters"]
  },
  imageUrl: {
    type: String,
    required: [true, 'Course  must have a image']

  },
  duration: {
    type: String,
    required: [true, 'The course must have a duration time'],

  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  price: {
   type:String
  },
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Review"
    }
  ],
  owner: String
  ,
  customers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    }
  ]

}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})




courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'customers',
    select: '-__v -passwordChangedAt'
  }).populate({
    path: "reviews",
   
  })

  next();
});




const Course = mongoose.model('Course', courseSchema)

module.exports = Course