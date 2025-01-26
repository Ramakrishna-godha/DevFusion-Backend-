const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //refers to the user connection
      required: true,
    },

    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect type`,
      },
    },
  },
  {
    timestamps: true,
  }
);
// connectionRequestSchema.index({ fromUserId: 1 });
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // Checks the fromUserId is same as toUserid

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new error("Cannot send connection request to yourself ");
  }
  next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
