import { eligibilityServiceOutput, reward } from './constants.js'
/**
 * @param {{ customerAccountNumber: number, portfolio: {channel: string, reward: string}[], eligibilityService:(customerAccountNumber: number)=>string }}
 * @returns {{ data: [] } | {code: number, message: string}}
 */
export function rewardsService({ customerAccountNumber, portfolio, eligibilityService }) {
    const res = eligibilityService(customerAccountNumber)
    if (res === eligibilityServiceOutput.CUSTOMER_ELIGIBLE)
        return { data: portfolio.filter(el => el.reward !== reward.NA).map(el => el.reward) }

    if (res === eligibilityServiceOutput.CUSTOMER_INELIGIBLE) return { code: 1 }

    if (res === eligibilityServiceOutput.ERROR) return { code: 2 }

    if (res === eligibilityServiceOutput.INVALID_ACC_NO) return { code: 3, message: res }

    return { code: 0 }
}

