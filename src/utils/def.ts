import {z} from "zod"

export const Round2Content = {
    firstWord: z.string().nullable(),
    secondWord: z.string().nullable(),
    thirdWord: z.string().nullable(),
    latitude: z.string().nullable(),
    longitude: z.string().nullable(),
    hexahue: z.string().nullable(),
    asciiResult: z.string().nullable(),
    badge: z.string().nullable(),
}
export const Round1Content= {
    hiddenRoute: z.string().nullable(),
    loginRoute: z.string().nullable(),
    shifts: z.string().nullable(),
    playfairKey: z.string().nullable(),
    passcode: z.string().nullable(),
    captchaSolved: z.boolean().nullable(),
    hackerName: z.string().nullable(),
    hackerLocation: z.string().nullable(),
    hackerPin: z.string().nullable(),
    directEntry: z.string().nullable(),
}
