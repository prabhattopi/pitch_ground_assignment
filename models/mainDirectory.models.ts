import mongoose from "mongoose";

export interface FolderDocument extends mongoose.Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a folder name"],
      min: 3,
      max: 20,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
const Folder = mongoose.model<FolderDocument>("Folder", folderSchema);
export default Folder;

