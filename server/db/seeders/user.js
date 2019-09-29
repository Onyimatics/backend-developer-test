import { User } from '../models/user';

const createUser = ({
  firstName, lastName, email, password, isAdmin,
}) => {
  const user = new User({
    firstName,
    lastName,
    email,
    password,
    isAdmin,
  });
  user.save();
};

const seed = [{
  firstName: 'Mikel',
  lastName: 'Obi',
  email: 'mikelobi@gmail.com',
  password: '123456789',
  isAdmin: true,
},
{
  firstName: 'Taye',
  lastName: 'Taiwo',
  email: 'tayetaiwo@gmail.com',
  password: '123456789',
  isAdmin: true,
},
];


seed.forEach((user) => createUser(user));
