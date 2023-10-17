import { Schema } from "mongoose";

export const HouseSchema = new Schema({
    bedrooms: { type: Number, required: true, min: 1, max: 30 },
    bathrooms: { type: Number, required: true, min: 1, max: 30 },
    year: { type: Number, required: true, min: 1000, max: 2025 },
    price: { type: Number, required: true, min: 0, max: 100000000 },
    imgUrl: { type: String, required: true, minLength: 3, maxLength: 300, default: 'https://hips.hearstapps.com/hmg-prod/images/tiny-houses-1579284305.png?resize=640:*' },
    description: { type: String, required: true, minLength: 3, maxLength: 150 },
    address: { type: String, required: true, minLength: 3, maxLength: 45 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
    { timestamps: true, toJSON: { virtuals: true } },
)