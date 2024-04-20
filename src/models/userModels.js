import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password_hash: String,
});

const User = mongoose.model('User', userSchema);

export const getUsers = async () => {
    try {
        let results = await User.find({}).limit(50);
        return results;
    } catch(err) {
        console.log(err);
        return null;
    }
}

export const createUser = async (userData) => {
    try {
        let user = new User(userData);
        let result = await user.save();
        return result;
    } catch(err) {
        console.log(err);
        return null;
    }
}

export const emailUtilized = async (email) => {
    const user = await User.findOne({ email: email });

    if (user) {
        return true;
    } else {
        return false;
    }
}

export const findUser = async (email) => {
    const user = await User.findOne({ email: email });

    if (user) {
        return user;   
    } else {
        return null;
    }
}

export const deleteTheUser = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);
        return user;
    } catch(err) {
        console.log(err);
        return null;
    }
}
