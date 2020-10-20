const firebase = require('../services/firebase');

const employeeRef = firebase.firestore().collection('employees');
const storageRef = firebase.storage().ref();

exports.getEmployees = async (req, res) => {
  try {
    let collections;
    if (req.query.searchTerm && req.query.searchBy) {
      const { searchTerm, searchBy } = req.query;
      collections = await employeeRef.where(searchBy, '==', searchTerm).get();
    } else {
      collections = await employeeRef.orderBy('creationDate', 'desc').get();
    }

    if (collections.empty) {
      res.status(200).json({
        success: true,
        data: 'No matching documents.',
      });
      return;
    }

    let data = [];

    collections.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: [],
    });
  }
};

exports.addEmployee = async (req, res) => {
  try {
    let imageUrl = '';

    if (req.files) {
      const { name, data } = req.files.photo;
      console.log(name, data);

      const imageRef = await storageRef.child(name);
      const imageBuffer = new Uint8Array(data);
      const imageResponse = await imageRef.put(imageBuffer);
      if (imageResponse.state === 'success') {
        imageUrl = await storageRef.child(name).getDownloadURL();
      }
    }
    const {
      name = '',
      email = '',
      zipcode = '',
      address = '',
      location = '',
    } = req.body;

    const employee = await employeeRef.add({
      name,
      email,
      zipcode,
      address,
      location,
      photo: imageUrl,
      creationDate: firebase.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({
      success: true,
      data: employee.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: [],
    });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await employeeRef.doc(req.params.id).update(req.body);

    res.status(200).json({
      success: true,
      data: [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: [],
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await employeeRef.doc(req.params.id).delete();

    res.status(200).json({
      success: true,
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
    });
  }
};
