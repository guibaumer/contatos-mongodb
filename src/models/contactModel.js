import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  number: String,
  user_id: String,
});

const Contact = mongoose.model('Contact', contactSchema);

export const createContact = async (contactData) => {
    try {
        let contact = new Contact(contactData);
        let result = await contact.save();
        return result;
    } catch(err) {
        console.log(err);
        return null;
    }
} 

export const getContacts = async (user_id) => {
    if (!user_id) return null;

    try {
        const contacts = await Contact.find({ user_id: user_id }).limit(50);
        return contacts;
    } catch(err) {
        console.log(err);
        return null;
    }
}

export const getOneContact = async (contact_id) => {
    if (!contact_id) return null;

    try {
        const contact = await Contact.findOne({ _id: contact_id });
        return contact;
    } catch(err) {
        console.log(err);
        return null;
    }
}

export const updateContact = async (contactData, id) => {
    try {
        let contact = await Contact.findByIdAndUpdate(id, contactData);

        if (contact) {
            return true;
        } else {
            return false;
        }

    } catch(err) {
        console.log(err);
        return null;
    }
}

export const deleteOneContact = async (id) => {
    try {
        let contact = await Contact.findByIdAndDelete(id);

        if (contact) {
            return true;
        } else {
            return false;
        }

    } catch(err) {
        console.log(err);
        return null;
    }
}