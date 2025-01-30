import { google } from "googleapis"
import { NextResponse } from "next/server"



// Random Ass Comment


const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || "{}"),
//   credentials: creds,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

const sheets = google.sheets({ version: "v4", auth })

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { team_name, leader_name, leader_contact, team_members } = body

    const spreadsheetId = process.env.GOOGLE_SHEETS_ID
    const range = "Sheet1!A:Z" // This targets all columns, allowing for a single row entry

    const values = [
      [
        team_name,
        leader_name,
        leader_contact,
        team_members[0].member_name,
        team_members[0].member_contact,
        team_members[1].member_name,
        team_members[1].member_contact,
        team_members[2].member_name,
        team_members[2].member_contact,
        new Date().toISOString(),
      ],
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })

    return NextResponse.json({ message: "Registration successful" }, { status: 200 })
  } catch (error) {
    console.error("Error registering team:", error)
    return NextResponse.json({ message: "Registration failed" }, { status: 500 })
  }
}

