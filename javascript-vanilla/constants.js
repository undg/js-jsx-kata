export const channel = {
    SPORTS: 'SPORTS ',
    KIDS: 'KIDS  ',
    MUSIC: 'MUSIC  ',
    NEWS: 'NEWS ',
    MOVIES: 'MOVIES ',
}

export const reward = {
    CHAMPIONS_LEAGUE_FINAL_TICKET: 'CHAMPIONS_LEAGUE_FINAL_TICKET',
    KARAOKE_PRO_MICROPHONE: 'KARAOKE_PRO_MICROPHONE',
    NA: 'N/A',
    PIRATES_OF_THE_CARIBBEAN_COLLECTION: 'PIRATES_OF_THE_CARIBBEAN_COLLECTION',
}

export const subscriptions = [
    { channel: channel.SPORTS, reward: reward.CHAMPIONS_LEAGUE_FINAL_TICKET },
    { channel: channel.KIDS, reward: reward.NA },
    { channel: channel.MUSIC, reward: reward.KARAOKE_PRO_MICROPHONE },
    { channel: channel.NEWS, reward: reward.NA },
    { channel: channel.MOVIES, reward: reward.PIRATES_OF_THE_CARIBBEAN_COLLECTION },
]

export const eligibilityServiceOutput = {
    CUSTOMER_ELIGIBLE: 'CUSTOMER_ELIGIBLE', // Return relevant rewards according to the customer's portfolio
    CUSTOMER_INELIGIBLE: 'CUSTOMER_INELIGIBLE', // Return no rewards
    ERROR: 'Technical failure exception', // Return no rewards
    INVALID_ACC_NO: 'Invalid account number exception', // Return no rewards and notify the client that the account number is invalid
}

