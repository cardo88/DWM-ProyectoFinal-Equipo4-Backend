const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createUser = async (req, res) => {
  console.log("entre a createUser del controlador");
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(400).json({ msg: 'Ya existe el usuario, elija otro!' });
    }

    const username = new User(req.body);
    await username.save();
    res.status(201).json(username);
} catch (error) {
    if (error.name === 'ValidationError') {
        // Manejar errores de validación
        const validationErrors = {};
        for (const field in error.errors) {
            validationErrors[field] = error.errors[field].message;
        }
        res.status(400).json({ errors: validationErrors });
    } else {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

  // const { username, password } = req.body;
  // // Check if username is already taken
  // if (users.find(user => user.username === username)) {
  //   return res.status(400).json({ error: 'Username already taken' });
  // }
  // // Create a new user
  // const newUser = { username, password };
  // users.push(newUser);

  // Create a JWT token for the new user
  const token = jwt.sign({ username }, secretKey);

  // Return the token
  res.json({ token });
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};



// exports.createUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined!'
//   });
// };


exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
