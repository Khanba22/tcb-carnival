import mongoose from "mongoose";

export interface IEntry extends mongoose.Document {
  team_name: string;
    leader_name: string;
    leader_contact: string;
    team_members: Array<{
        member_name: string,
        member_contact: string,
    }>;
}

const EntrySchema = new mongoose.Schema({
  team_name:{
    type: String,
    required: true,
  },
    leader_name:{
        type: String,
        required: true,
    },
    leader_contact:{
        type: String,
        required: true,
    },
    team_members:{
        type: Array,
        required: true,
    },
});

export default mongoose.models.Entry || mongoose.model<IEntry>("Entry", EntrySchema);