import React from "react";
import TopBar from "../TopBar/TopBar";
import { BaseReactComponent } from "src/utils/form";
import "./_termsAndConditions.scss";

class TermsAndConditions extends BaseReactComponent {
  render() {
    console.log("this ", this.props);
    return (
      <div className="terms-and-conditions-page">
        <TopBar
          connectedWalletBalance={this.props.connectedWalletBalance}
          isWalletConnected={this.props.isWalletConnected}
          connectedWalletAddress={this.props.connectedWalletAddress}
          connectedWalletevents={this.props.connectedWalletevents}
          openConnectWallet={this.props.openConnectWallet}
          disconnectWallet={this.props.disconnectWallet}
          history={this.props.history}
        />
        <div className="page">
          <div className=" page-scroll">
            <div className="page-scroll-child">
              <h1>Terms & Conditions of Use</h1>
              <p>
                Welcome to Loch Inc, hereinafter also referred to as “Loch” or
                “we/us/our”. We offer a software as a service solution "SaaS",
                hereinafter referred to as "the Software" through our website
                loch.one (the "Website"). The Software enables you (the "User")
                to create trading rules and automate their operation on
                third-party cryptocurrency exchanges.
              </p>
              <p>
                These Terms and Conditions (the "Terms" “Terms of Use”, “Terms
                of Service”), the Privacy Policy and the Cookie Policy govern
                the relationship between Loch and its Users for any use of the
                Website and the Software that Loch offers. This constitutes the
                entire, complete and binding agreement between you and Loch with
                respect to the Software and Website. You are not permitted to
                use the Website and the Software without accepting these Terms.
              </p>
              <p>
                You should also read our Privacy Policy at Loch.one/privacy,
                which is incorporated by reference into the Terms of Use. You
                should also read our Cookie Policy at Loch.one/cookies which is
                incorporated by reference into the Terms of Use. If you do not
                wish to be bound by these Terms of Use or by the terms of our
                Privacy Policy or our Cookie Policy, please do not access or use
                the Software.
              </p>
              <p>
                These terms of use contain very important information regarding
                your rights and obligations, as well as conditions, limitations,
                and exclusions. Please read these Terms of Use carefully before
                accessing or using the Software. By using the Software in any
                way and for any purpose, with or without a user account and from
                any device and location, you agree and confirm that:
              </p>
              <ul>
                <li>
                  You have read and understood these Terms of Use and you accept
                  and agree to be bound by these Terms of Use as they appear on
                  each respective date that you use the Software.
                </li>
                <li>You assume all the obligations set forth herein</li>
                <li>
                  You are of sufficient legal age and capacity to use the
                  Software
                </li>
                <li>
                  You are not under the control of jurisdiction that explicitly
                  prohibits the use of similar software
                </li>
                <li>
                  You understand and agree that Loch is experimental Software
                  and cannot take any responsibility for any financial losses.
                </li>
                <li>
                  You use the Software at your discretion and under your own
                  responsibility.
                </li>
              </ul>
              <p>
                Please note that using Loch is not: (i) within scope of the
                jurisdiction of the Financial Ombudsman Service, or (ii) subject
                to protection under the Financial Services Compensation Scheme,
                or (iii) within scope of the jurisdiction of, or subject to
                protection under, either of the schemes referred to in paragraph
                (i) or (ii).
              </p>
              <h3>Contents</h3>
              <ul>
                <li>Definitions</li>
                <li>Registration and personal account</li>
                <li>Offers and prices</li>
                <li>Free Trial</li>
                <li>Subscription and payment</li>
                <li>Cancellation</li>
                <li>Refund Policy</li>
                <li>Account deletion</li>
                <li>User license</li>
                <li>Disclaimer and representations</li>
                <li>Limitation of Liability</li>
                <li>Accuracy of materials</li>
                <li>Marketplace</li>
                <li>Links</li>
                <li>Modifications</li>
                <li>Trademarks</li>
                <li>Governing Law</li>
                <li>Restricted Locations, Individuals and Entities</li>
                <li>Loch Investment Disclaimer</li>
                <li>Decentralised Finance Integration</li>
                <li>Approved Loch Partners Terms & Conditions</li>
              </ul>
              <h3>Definitions</h3>
              <p>
                1.0.1 Loch: Loch Incorporated is a C-corp incorporated under the
                laws of the United States of America. The company is registered
                in the State of Delaware under the identification number
                32-0678859. The company’s registered office is at 2261 Market St
                in San Francisco, California, 94114. 1.0.2 "Agreement" means
                this Terms of Use and any Supplemental Terms applicable to your
                use of our Services. 1.0.3"Us", "We", "Loch" means Loch Inc.
                1.0.4 "You" means the individual or legal entity, as applicable,
                that is using or accessing the Services, or that is identified
                as the user when you registered on the Services. 1.0.5 User(s):
                individual consumers or legal entities making use of the Website
                or Software. Also referred to as "you". 1.0.6 Software:
                developed and fully owned by Loch, the Software enables users to
                create various trading rules on a user-friendly digital
                interface. 1.0.7 "Website" refers to the Loch website located at
                www.Loch.one, including all subdomains, content, and related
                services. 1.0.8 Rules: trading strategies, built with indicators
                such as but not limited to price, volume and market
                capitalization. The range of rules is subject to change in
                accordance with Loch’s future amendments to the interface. 1.0.9
                Free Trial: the trial version of the Software available to users
                for free for a period of time. The availability of rules and
                functionalities of the Software is limited in the Free Trial.
                1.1.0 Subscription: one of the selected paid plans that permits
                the User to use the Software. You can select a monthly or an
                annual subscription plan upon registration. 1.1.1 "Blockchain"
                means a distributed, digital ledger of records that is
                maintained by a network of nodes or computer systems and linked
                together through cryptographic hashes. 1.1.2"DeFi",
                "Decentralised Finance" means an ecosystem of financial
                applications built on blockchain networks. 1.1.3"Digital Asset"
                means any cryptocurrency, cryptoasset, blockchain-based token,
                or other digital asset supported by the Services.
                1.1.4"Integration" means the Uniswap protocol or any other DeFi
                project or Protocol which we may decide to integrate in the
                future. 1.1.5"Services" means any products and services made
                available by Loch, including the DeFI integration and without
                limitation to the Website and the App. 1.1.6"Uniswap Labs" means
                the major contributor to the Uniswap Protocol and developer of a
                suite of products to support the Uniswap ecosystem.
                1.1.7"Uniswap Protocol" means the currently largest
                decentralized trading and automated market making protocol on
                the Ethereum Blockchain. 1.1.8"Ethereum Blockchain" means the
                decentralized, open-source blockchain network built on the
                Ethereum platform, which supports the development and deployment
                of smart contracts and decentralized applications. 1.1.8.1
                "Protocol" refers to a set of rules and guidelines followed by
                different blockchain networks for communication, data transfer,
                and transaction processing. 1.1.8.2 "Smart Contract" means a
                self-executing contract with the terms of the agreement directly
                written into code, which is stored and executed on a blockchain
                network. 1.1.8.3 "Decentralized Application" (or "DApp") refers
                to a software application that runs on a decentralized network,
                typically using blockchain technology and smart contracts to
                function without a central authority.
              </p>
              <h3>Registration and personal account</h3>
              <p>
                2.1 If you want to use our Website and Software, go to our
                Website Loch.one. 2.2 To have initial access to the Software,
                you will need to register and create a personal account. You can
                register using your personal email or opt to log in through your
                LinkedIn, Google or Facebook profiles in order to use the
                Website and the Software. 2.3 You must protect the login details
                of your account and keep your password strictly secret. We will
                assume that all activity from your account is carried out by you
                or under your supervision. 2.4 You agree to provide up-to-date,
                accurate and complete information on your account. You agree to
                keep your personal account information up to date when
                necessary, so we can contact you if needed.
              </p>
              <h3>Offers and prices</h3>
              <p>
                3.1 All offers and free trials on the Website are without
                obligations. However, all offers and free trials are always
                subject to these Terms. 3.2 Contingent on your jurisdiction, the
                prices on the Website can be either inclusive or exclusive of
                taxes and expenses. 3.3 We reserve the right to adjust the
                prices subject to the digital market conditions. You agree to
                any price changes that shall take effect immediately.
              </p>
              <h3>Free Trial</h3>
              <p>
                4.1 Upon registration, you may have an option to select a Free
                Trial whereby you would be entitled to use the Software under a
                Free Plan for a period of time. 4.2 Some functionalities are
                subject to limitations during the Free Trial. Loch reserves the
                right to amend the structure, length and availability of trading
                rule options within the Free Trial. 4.3 Loch reserves the right
                to introduce or withdraw the option for users to select a Free
                Trial at any time.
              </p>
              <h3>Subscription and payment</h3>
              <p>
                5.1 You need a Subscription to use the Website and the Software
                and its range of functionalities. 5.2 Subscriptions are offered
                on the basis of your selected plan for a fixed amount per month
                and/or per year. 5.3 Loch offers several Subscription plans.
                Each plan differs in terms of but not limited to, access to
                trading rules, exchanges, template strategies, learning content
                and other relevant options. 5.4 The price of the Subscription
                will be invoiced automatically every month/year. Possible
                methods of payment are authorized via Stripe or Coinbase
                Commerce. and are displayed on the Website and include, for
                example, credit cards such as Visa or MasterCard. 5.5 By
                choosing one of the payment options, you grant your permission
                for us to initiate a payment or a series of payments on your
                behalf via Stripe and Coinbase Commerce, which will be marked as
                a Merchant-Initiated Transaction (MIT) by Stripe and Coinbase
                Commerce. All your payment details will be confidentially
                secured. Neither Loch nor Stripe, Coinbase Commerce will have
                access to your financial data. 5.6 A monthly subscription will
                continue for a month-to-month period, unless User cancels the
                subscription before the end of the term already paid for. 5.7 An
                annual subscription will automatically be extended after
                expiration, unless User cancels the subscription before the end
                of the term already paid for. 5.8 User can cancel the
                subscription by the end of the term already paid for. The
                account of the User will remain active for the period that User
                has already paid for. 5.9 The Data on the User’s account may be
                subject to deletion after the cancellation of the Subscription
                or Trial.
              </p>
              <h3>Cancellation</h3>
              <p>
                6.1 Users have the right to cancel their Subscription, Trial and
                Account at any time. 6.2 Loch reserves the right to retain the
                payments that Users have paid for the amount of time they have
                selected.
              </p>
              <h3>Refund Policy</h3>
              <p>
                7.1 If the User paid for a chosen subscription plan and has
                consequently decided to cancel the plan following provisions of
                Clause 6 above, Loch reserves the right to allow the User to
                request a refund during a one week (7 days) period after the
                subscription start date. 7.2 Following the lapse of one week (7
                days) after the subscription start date, Loch reserves its full
                discretion to refund requested amounts to subscribers who
                canceled their subscription plans in accordance with Clause 6
                above and have not requested a refund in accordance with Clause
                7.1. 7.3 At all times otherwise, Loch reserves the right to
                retain the payments that Users have paid for the amount of time
                they have selected.
              </p>
              <h3>Account deletion</h3>
              <p>
                If you would like to terminate your activity on Loch and
                permanently delete your account and User details, you have a
                right to request Loch’s Support Team to delete your account and
                all the data associated with it. We will not store the data you
                provided on Loch during the period of your activity and will
                delete your account permanently. Please contact us by email on
                prithvir@loch.one or via our chat with a request to delete your
                account.
              </p>
              <h3>User license</h3>
              <p>
                9.1 This is the grant of a license, not a transfer of title,
                meaning you are entitled to temporarily access the Software
                during the Free Trial, or alternatively, permanently for the
                duration of having a paid Subscription. Under this license you
                may not: modify or copy the materials; use the materials for any
                commercial purpose, or for any public display (commercial or
                non-commercial); attempt to decompile or reverse engineer any
                software contained on Loch's Website; remove any copyright or
                other proprietary notations from the materials; or transfer the
                materials to another person or "mirror" the materials on any
                other server. Any intellectual property objects within Loch
                including all information, data, products, materials, services,
                software applications and tools, APIs, design elements, text,
                images, photographs, illustrations, audio and video contents,
                artwork and graphics contained therein or otherwise made
                available to you in connection therewith provided through or
                used to operate the Software is licensed, not sold, to you by
                Loch. 9.2 This license shall be automatically terminated if you
                violate any of these restrictions and may be terminated by Loch
                at any time. 9.3 For all content and data, that you create or
                make available via the Software ("User Content"), you grant Loch
                free of charge a transferable, sublicensable, non-exclusive,
                irrevocable, worldwide right of use and exploitation and for the
                maximum term permitted under applicable law and which is
                unlimited in terms of content, to use this User Content for any
                purpose including but not limited to amend, edit and translate,
                as well as to store, reproduce, disseminate, make accessible to
                the public, send, disclose publicly and non-publicly and
                otherwise make available the User Content, including, without
                limitation, all trading strategies that you create, the names of
                such trading strategies and any settings that you create for
                such trading strategies.
              </p>
              <h3>Disclaimer and representations</h3>
              <p>
                10.1 The materials on Loch's Website are provided on an 'as is'
                basis. Loch makes no warranties, expressed or implied, and
                hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of
                rights. 10.2 Loch does not warrant or make any representations
                concerning the accuracy, likely results, or reliability of the
                use of the materials on its Website or otherwise relating to
                such materials or on any sites linked to this site.
              </p>
              <h3>Limitation of Liability</h3>
              <p>
                11.1 In no event shall Loch or its suppliers be liable for,
                including but not limited to, any damages for loss of data,
                financial losses, business interruption and injury arising out
                of the use of or the omission to use any materials on the
                Website, even if Loch or a Loch authorized representative has
                been notified orally or in writing of the possibility of such
                damage. 11.2 To the fullest extent permitted by applicable law,
                Loch and parties collaborating with Loch will not be liable to
                you under any type of liability, whether based in contract,
                tort, negligence, strict liability, warranty or otherwise - for
                any indirect, consequential, exemplary, incidental, punitive or
                special damages or profit losses. 11.3 Clause 11 is universally
                applicable to all Users, regardless of geographical position or
                jurisdiction.
              </p>
              <h3>Accuracy of materials</h3>
              <p>
                12.1 The materials appearing on Loch’s Website could include
                technical, typographical, or photographic errors. Loch does not
                warrant that any of the materials on its Website are accurate,
                complete or current. 12.2 Loch may make changes to the materials
                contained on its Website at any time without notice. However,
                Loch does not make any commitment to update the materials.
              </p>
              <h3>Marketplace</h3>
              <p>
                13.1 Loch may provide access to Third-Party Services for your
                use. Such Third-Party Services include but are not limited to
                “Marketplace”. 13.2 The Marketplace is intended for the exchange
                of cryptocurrency trading strategies and related tools. 13.3
                While the Marketplace provides access to strategies it is not
                providing its subscribers any financial advice. 13.4 You are
                prohibited from using the Marketplace for illegal activities,
                including but not limited to money laundering, fraud, or
                financing of terrorist activities.
              </p>
              <h3>Links</h3>
              <p>
                Loch reserves the right to not fully review all of the sites
                linked to its Website and is not responsible for the contents of
                any linked site. The legitimacy and reliability of the data
                provided by the Websites referred to on Loch’s Website is
                limited to the obligations to those Websites’ operators.
              </p>
              <h3>Modifications</h3>
              <p>
                Loch may revise these Terms or its Website at any time without
                notice. By using this Website, you are agreeing to be bound by
                the then current version of these terms of service.
              </p>
              <h3>Trademarks</h3>
              <p>
                LOCH.ONE and our logos, product service names, slogans and the
                Software are trademarks of Loch and may not be copied, imitated
                or used, in whole or in part, without our prior written
                authorization. All other trademarks, registered trademarks,
                product names and company names or logos mentioned on the
                Services are the property of their respective owners. Reference
                to any products, services, processes or other information by
                trade name, trademark, manufacturer, supplier or otherwise does
                not constitute or imply endorsement, sponsorship or
                recommendation by us.
              </p>
              <h3>Governing Law</h3>
              <p>
                These Terms are governed by and construed in accordance with the
                laws of the United States within the jurisdiction of Delaware.
                You unconditionally submit to the exclusive jurisdiction of the
                courts of Delaware.
              </p>
              <h3>Restricted Locations, Individuals and Entities</h3>
              <p>
                18.1 You may not use the Website and the Software if you are
                located in, or are a citizen or a resident, of any state,
                county, territory or other jurisdiction that is embargoed by the
                United Kingdom, United States of America or the European Union,
                if you are an individual, an entity or a group listed on the
                United Nations Security Council Consolidated List, or where your
                use of the Website and the Software would be illegal or
                otherwise violate any applicable law. 18.2 You represent and
                warrant that you are not a citizen or a resident of a
                jurisdiction which is considered a restricted jurisdiction by EU
                Regulations or the laws of the United Kingdom or the United
                States of America, and that you will not use any Services while
                located in any such jurisdiction. 18.3 Loch may implement
                controls to restrict access to the Website and the Software from
                any jurisdiction prohibited pursuant to this Section You will
                comply with this Section, even if Loch’s methods to restrict use
                of the Website and the Software are not effective or can be
                bypassed.
              </p>
              <h3>Loch Investment Disclaimer</h3>
              <p>
                19.1 No Investment Advice. The information provided on this
                Website does not constitute investment advice, financial advice,
                trading advice, or any other sort of advice. You should not
                treat any of the Website's content as such. Loch does not
                recommend that any cryptocurrency should be bought, sold, or
                held by you. Nothing on this Website should be taken as an offer
                to buy, sell or hold a cryptocurrency. You should take
                reasonable steps to conduct your own due diligence and consult
                your financial advisory before making any investment decision.
                Loch will not be held responsible for the investment decisions
                you make based on the information provided on the Website,
                within the Software or on any of Loch’s public channels such as
                social media or otherwise. 19.2 Accuracy of Information. Loch
                will strive to ensure accuracy of the information listed on this
                Website, on our social media accounts including X, Instagram,
                Telegram, Facebook, LinkedIn, or on any of our communication
                channels, although Loch will not hold any responsibility for any
                missing or inaccurate information. You understand that you are
                using any and all information available from Loch AT YOUR OWN
                RISK. You should take adequate steps to verify the accuracy and
                completeness of any information on the Website, on Loch’s social
                media platforms or on any other Loch communication channels.
                19.3 Price Risk. The price of Bitcoin and other cryptocurrencies
                are highly volatile. It is possible for prices to increase or
                decrease by over 100% in a single day. Although this could mean
                potential profits, this also could mean potential losses. Only
                invest money which you are ready to lose. Cryptocurrency trading
                may not be suitable for all users of this Website. Anyone
                looking to invest in cryptocurrencies should consult a fully
                qualified independent professional financial adviser. 19.4 No
                Affiliation to Any Cryptocurrency. Loch is not affiliated in any
                manner with any cryptocurrency. Loch allows users to build
                automated trading strategies that get executed on third-party
                cryptocurrency exchanges. Loch safely stores the Users’
                information and does not disclose User data directly to
                cryptocurrency exchanges. 19.5 Execution Risk. Trading
                strategies set on Loch are executed on third-party controlled
                exchanges. Loch is not a trading platform and does not store or
                trade cryptocurrencies. Any execution failures or other events
                related to third-party exchanges ARE ENTIRELY OUTSIDE OF LOCH’S
                control. Loch does not take any liability for failures related
                to third-party exchanges. Use of third-party exchanges is solely
                at your own risk. Any financial risks associated with your
                trading decisions are reserved to you only.
              </p>
              <h3>Decentralised Finance Integration</h3>
              <p>
                20.1 The integration of decentralized finance (DeFi) projects or
                protocols such as the Uniswap Protocol is part of Loch's
                offerings. Loch does not own or control these DeFi protocols and
                makes no warranties regarding their operation, security, or
                availability. 20.2 By using the DeFi integration, you
                acknowledge and accept the risks associated with decentralized
                finance, including but not limited to smart contract
                vulnerabilities, liquidity risks, and market volatility. 20.3
                Loch shall not be liable for any losses or damages arising from
                your use of DeFi protocols.
              </p>
              <h3>Approved Loch Partners Terms & Conditions</h3>
              <p>
                21.1 Loch maintains a list of approved partners who have met our
                stringent criteria for partnership. These partners are
                authorized to provide additional services or integrations that
                complement the functionality of Loch's Software. 21.2 Approved
                partners must adhere to Loch's standards and guidelines,
                ensuring that their services are reliable, secure, and provide
                value to Loch users. 21.3 Loch reserves the right to modify or
                terminate any partnership at its discretion, particularly if the
                partner fails to comply with Loch's terms or if the partnership
                no longer aligns with Loch's strategic goals. 21.4 Users
                engaging with services from approved partners do so at their own
                risk. Loch is not responsible for the actions, omissions, or
                performance of its partners. 21.5 Any disputes arising from
                services provided by approved partners must be resolved directly
                between the user and the partner. Loch does not mediate or
                resolve disputes on behalf of its partners. 21.6 By using
                services from approved partners, users agree to comply with any
                additional terms and conditions set forth by the partner. These
                terms are separate from and in addition to Loch's Terms of Use.
              </p>

              <h4> GENERAL DISCLAIMER</h4>
              <h4>
                LOCH IS NOT A BROKER, FINANCIAL ADVISOR, INVESTMENT ADVISOR,
                PORTFOLIO MANAGER OR TAX ADVISOR. NOTHING ON OR IN THE SOFTWARE
                SHALL CONSTITUTE OR BE CONSTRUED AS AN OFFERING OF ANY CURRENCY
                OR ANY FINANCIAL INSTRUMENT OR AS INVESTMENT ADVICE OR
                INVESTMENT RECOMMENDATIONS (SUCH AS RECOMMENDATIONS AS TO
                WHETHER TO PURCHASE A CURRENCY OR INSTRUMENT) BY LOCH. YOU
                ACKNOWLEDGE AND AGREE THAT LOCH IS NOT RESPONSIBLE FOR YOUR USE
                OF ANY INFORMATION THAT YOU OBTAIN ON THE SOFTWARE. YOUR
                DECISIONS MADE IN RELIANCE ON THE PRODUCTS OR SERVICES IN THE
                SOFTWARE OR YOUR INTERPRETATIONS OF THE DATA FOUND IN THE
                SOFTWARE ARE YOUR OWN FOR WHICH YOU HAVE FULL RESPONSIBILITY.
                YOU EXPRESSLY AGREE THAT YOU USE THE SOFTWARE AT YOUR SOLE RISK.
              </h4>
              <h4>
                LOCH IS NOT RESPONSIBLE FOR ANY LOSSES INCURRED WHILE USING THE
                SOFTWARE OR THE WEBSITE AND YOU ACKNOWLEDGE THAT ALL TRADES MADE
                USING THE SOFTWARE OR THE WEBSITE ARE MADE AT YOUR OWN RISK YOU
                EXPRESSLY ACKNOWLEDGE AND AGREE THAT YOU MAY LOSE SOME OR ALL OF
                YOUR FUNDS. CRYPTOCURRENCIES ARE A NEW AND INSUFFICIENTLY TESTED
                TECHNOLOGY. IN ADDITION TO THE RISKS INCLUDED HEREIN, THERE ARE
                OTHER RISKS ASSOCIATED WITH YOUR USE OF THE SOFTWARE, AND THE
                PURCHASE, HOLDING AND USE OF CRYPTOCURRENCIES, INCLUDING THOSE
                THAT LOCH CANNOT ANTICIPATE. SUCH RISKS MAY FURTHER MATERIALIZE
                AS UNANTICIPATED VARIATIONS OR COMBINATIONS OF THE RISKS
                DISCUSSED HEREIN.
              </h4>

              <h4>
                ALL INFORMATION CONTAINED ON THE WEBSITE AND ITS SERVICES IS FOR
                GENERAL INFORMATIONAL USE ONLY AND SHOULD NOT BE RELIED UPON BY
                YOU IN MAKING ANY INVESTMENT DECISION. THE WEBSITE AND SERVICES
                DO NOT PROVIDE INVESTMENT ADVICE AND NOTHING ON THE WEBSITE AND
                SERVICES SHOULD BE CONSTRUED AS BEING INVESTMENT ADVICE. BEFORE
                MAKING ANY INVESTMENT CHOICE, YOU SHOULD ALWAYS CONSULT A FULLY
                QUALIFIED FINANCIAL AND/OR INVESTMENT ADVISER.
              </h4>
              <p>
                The Website and the Software include and/or may include
                advertisements and links to external sites and co-branded pages
                or promote Websites or services from other companies or offer
                you the ability to download software or content from other
                companies in order to provide you with access to information and
                services which you may find useful or interesting. Loch does not
                endorse such sites nor approve any content, information, legal
                or illegal emails (whether spam emails or not), goods or
                services provided by them. Loch is not responsible for and does
                not control those Websites, services, emails, content and
                software and cannot accept any responsibility or liability for
                any loss or damage suffered by you as a result of your use of
                its Website and services or of such external and/or co-branded
                sites.
              </p>
              <p>
                Loch is unable to exercise control over the security or content
                of information passing over the network, and Loch hereby
                excludes all liability of any kind for the transmission or
                reception of infringing or unlawful information of whatever
                nature.
              </p>
              <h3>NOTICES</h3>
              <p>
                We may provide any notice to you under these Terms of Use by:
                (i) sending a message to the email address you provide to us and
                consent to us using; or (ii) by posting to the Software. Notices
                sent by email will be effective when we send the email and
                notices we provide by posting will be effective upon posting. It
                is your responsibility to keep your email address current and
                check for incoming messages regularly.
              </p>
              <p>
                To give us notice under these Terms of Use, you must contact us
                by email at support[at]Loch.one
              </p>
              <p>
                To request the consent of Loch for any of the actions for which
                such consent is required under these Terms of Use, please send
                an email to support[at]Loch.one. Loch reserves the right to
                refuse any such requests in its sole discretion.
              </p>
              <div>
                <p>
                  Loch Inc Registered Address: 2261 Market St, San Francisco, CA
                  - 94114
                </p>
                <p>Telegram: @prithvir1</p>
                <p>X: @loch_chain</p>
                <p>Email: prithvir@loch.one</p>
                <p>Website: loch.one</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TermsAndConditions;
