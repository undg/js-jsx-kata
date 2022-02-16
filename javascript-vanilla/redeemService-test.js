import { expect } from 'chai'
import { rewardsService }  from './redeemService.js'
import { eligibilityServiceOutput, reward, subscriptions }  from './constants.js'

describe('rewardsService()', () => {
    const customerAccountNumber = 1
    const portfolio = subscriptions
    const eligibilityService = () => ''

    it('should have rewardsService()', function() {
        const { data, ...service } = rewardsService({ customerAccountNumber, portfolio, eligibilityService })
        expect(service).to.exist
    })

    it('Unknown error', () => {
        const { data, message, code } = rewardsService({ customerAccountNumber, portfolio, eligibilityService })
        expect(data).to.not.exist
        expect(message).to.not.exist
        expect(code).to.be.eq(0)
    })

    it('CUSTOMER_ELIGIBLE', () => {
        const eligibilityService = () => eligibilityServiceOutput.CUSTOMER_ELIGIBLE
        const portfolio = subscriptions
        const { data } = rewardsService({ customerAccountNumber, portfolio, eligibilityService })
        // order should not matter
        expect(data).to.deep.includes.members([reward.PIRATES_OF_THE_CARIBBEAN_COLLECTION, reward.KARAOKE_PRO_MICROPHONE, reward.CHAMPIONS_LEAGUE_FINAL_TICKET])
    })

    it('CUSTOMER_INELIGIBLE', () => {
        const eligibilityService = () => eligibilityServiceOutput.CUSTOMER_INELIGIBLE
        const portfolio = subscriptions
        const { data, message, code } = rewardsService({ customerAccountNumber, portfolio, eligibilityService })
        expect(data).to.not.exist
        expect(message).to.not.exist
        expect(code).to.be.eq(1)
    })

    it('Technical failure', () => {
        const eligibilityService = () => eligibilityServiceOutput.ERROR
        const portfolio = subscriptions
        const { data, message, code } = rewardsService({ customerAccountNumber, portfolio, eligibilityService })
        expect(data).to.not.exist
        expect(message).to.not.exist
        expect(code).to.be.eq(2)
    })

    it('Invalid accout number', () => {
        const eligibilityService = () => eligibilityServiceOutput.INVALID_ACC_NO
        const portfolio = subscriptions
        const { data, message, code } = rewardsService({ customerAccountNumber, portfolio, eligibilityService })
        expect(data).to.not.exist
        expect(message).to.eq(eligibilityServiceOutput.INVALID_ACC_NO)
        expect(code).to.be.eq(3)
    })
})
