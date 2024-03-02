const teachers = require("./../Model/teacher");
const classes = require("./../Model/class");
const children = require("./../Model/child");

exports.getAllClasses = (req, res, next) => {
  classes
    .find({})
    .populate({ path: "supervisor", select: { fullname: 1, _id: 0 } })
    .populate({ path: "children", select: { fullname: 1, _id: 0 } })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.addClass = async (req, res, next) => {
  try {
    const supervisor = await teachers.findOne({ _id: req.body.supervisor });
    if (!supervisor) {
      throw new Error("Supervisor not found in teacher schema.");
    }

    const childrenArr = req.body.children;
    const childrenExist = await children.find({ _id: { $in: childrenArr } });

    // Check if all children were found
    if (childrenExist.length !== childrenArr.length) {
      throw new Error("'One or more children not found!'");
    }

    // Now you can create and save the class object
    const newClass = new classes(req.body);
    const savedClass = await newClass.save();
    res.status(200).json({ data: savedClass });
  } catch (error) {
    next(error);
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    const supervisor = await teachers.findOne({ _id: req.body.supervisor });
    if (!supervisor) {
      throw new Error("Supervisor not found in teacher schema.");
    }

    const childrenArr = req.body.children;
    const childrenExist = await children.find({ _id: { $in: childrenArr } });

    // Check if all children were found
    if (childrenExist.length !== childrenArr.length) {
      throw new Error("'One or more children not found!'");
    }

    classes
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((object) => {
        if (!object) throw new Error("class not exists ...");
        res.status(200).json({ data: "class Updated ..." });
      });
  } catch (error) {
    next(error);
  }
};

exports.getClassById = (req, res, next) => {
  classes
    .findOne({ _id: req.params.id })
    .populate({ path: "supervisor", select: { fullname: 1, _id: 0 } })
    .populate({ path: "children", select: { fullname: 1, _id: 0 } })
    .then((object) => {
      if (!object) throw new Error("class not exists ...");
      res.status(200).json({ object });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteClass = (req, res, next) => {
  classes
    .findOneAndDelete({ _id: req.params.id }, req.body)
    .then((object) => {
      if (!object) throw new Error("class not exists ...");
      res.status(200).json({ data: "class deleted ..." });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getClassChildren = (req, res, next) => {
  classes
    .findOne({ _id: req.params.id })
    .populate({ path: "children", select: { _id: 0 } })
    .then((object) => {
      if (!object) throw new Error("class not exists ...");
      res.status(200).json({ data: object.children });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getClassSupervisor = (req, res, next) => {
  classes
    .findOne({ _id: req.params.id })
    .populate({ path: "supervisor", select: { _id: 0 } })
    .then((object) => {
      if (!object) throw new Error("class not exists ...");
      res.status(200).json({ data: object.supervisor });
    })
    .catch((error) => {
      next(error);
    });
};

// exports.addClass = (req, res, next) => {
//   teachers
//     .findOne({ _id: req.body.supervisor })
//     .then((object) => {
//       if (!object) throw new Error("teacher not exists in teacher schema ...");
//       else {
//         const object = new classes(req.body);
//         object
//           .save()
//           .then((data) => {
//             res.status(200).json({ data });
//           })
//           .catch((error) => {
//             next(error);
//           });
//       }
//     })
//     .catch((error) => {
//       next(error);
//     });
// };

// exports.updateClass = (req, res, next) => {
//   teachers
//     .findOne({ _id: req.body.supervisor })
//     .then((object) => {
//       if (!object) throw new Error("teacher not exists in teacher schema ...");
//       else {
//         classes
//           .findOneAndUpdate({ _id: req.params.id }, req.body)
//           .then((object) => {
//             if (!object) throw new Error("class not exists ...");
//             res.status(200).json({ data: "class Updated ..." });
//           })
//           .catch((error) => {
//             next(error);
//           });
//       }
//     })
//     .catch((error) => {
//       next(error);
//     });
// };
