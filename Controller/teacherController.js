const teachers = require("./../Model/teacher");
const classes = require("./../Model/class");

exports.getAllTeachers = (req, res, next) => {
  teachers
    .find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.addTeacher = (req, res, next) => {
  const object = new teachers(req.body);
  object
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateTeacher = (req, res, next) => {
  teachers
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((object) => {
      if (!object) throw new Error("teacher not exists ...");
      res.status(200).json({ data: "teacher Updated ..." });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getTeacherById = (req, res, next) => {
  teachers
    .findOne({ _id: req.params.id })
    .then((object) => {
      if (!object) throw new Error("teacher not exists ...");
      res.status(200).json({ object });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteTeacher = (req, res, next) => {
  teachers
    .findOneAndDelete({ _id: req.params.id }, req.body)
    .then((object) => {
      if (!object) throw new Error("teacher not exists ...");
      res.status(200).json({ data: "teacher deleted ..." });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getClassSupervisors = (req, res, next) => {
  try {
    classes
      .find()
      .populate({ path: "supervisor" })
      .select("supervisor")
      .then((data) => {
        const supervisors = data.map((item) => item.supervisor);
        const uniqueSupervisors = [...new Set(supervisors)];
        res.status(200).json({ teachers: uniqueSupervisors });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
