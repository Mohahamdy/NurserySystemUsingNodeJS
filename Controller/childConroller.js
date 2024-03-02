const children = require("./../Model/child");

exports.getAllChildren = (req, res, next) => {
  children
    .find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.addChild = (req, res, next) => {
  const object = new children(req.body);
  object
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateChild = (req, res, next) => {
  children
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((object) => {
      if (!object) throw new Error("child not exists ...");
      res.status(200).json({ data: "child Updated ..." });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getChildById = (req, res, next) => {
  children
    .findOne({ _id: req.params.id })
    .then((object) => {
      if (!object) throw new Error("child not exists ...");
      res.status(200).json({ object });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteChild = (req, res, next) => {
  children
    .findOneAndDelete({ _id: req.params.id }, req.body)
    .then((object) => {
      if (!object) throw new Error("child not exists ...");
      res.status(200).json({ data: "child deleted ..." });
    })
    .catch((error) => {
      next(error);
    });
};
