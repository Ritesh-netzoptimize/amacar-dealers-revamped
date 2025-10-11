import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  Scale,
  Shield,
  Users,
  Lock,
  AlertTriangle,
  DollarSign,
  Gavel,
  Settings,
  CheckCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const DealershipAgreement = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const sections = [
    {
      id: "purpose-scope",
      title: "1. Purpose and Scope",
      icon: FileText,
      content: `This Agreement outlines the terms under which the Dealership accesses Amacar's Platform to view customer vehicle data, bid on vehicles, and engage in transactions with customers. By accessing or using the Platform, the Dealership agrees to these terms.

Amacar provides an online platform for vehicle appraisals and auctions, enabling consumers to receive estimated offers for their vehicles and allowing verified dealerships to place bids. Amacar facilitates connections but is not a party to any final transactions between Dealerships and customers.`,
    },
    {
      id: "dealership-responsibilities",
      title: "2. Dealership Responsibilities",
      icon: Users,
      content: `2.1 Participation in Auctions: Dealership agrees to participate in Amacar's online auction platform by submitting bids on vehicles listed by customers.

2.2 Valid Bids: All bids must be submitted in good faith and represent a genuine intent to purchase the vehicle if the bid is accepted by the customer. Non-serious or "fake" bids are strictly prohibited.

2.3 Final Appraisal and Inspection: The Dealership understands that Amacar facilitates the online valuation and auction process only. The final purchase price will be subject to an in-person inspection conducted by the Dealership at its location based on the actual condition of the vehicle.

2.4 Dealership Information: The Dealership agrees to maintain accurate business and contact information with Amacar and promptly update any changes.

2.5 Prohibited Activities: Dealership must not:
• Circumventing the Platform to contact customers directly without authorization, except for the purpose of facilitating further agreements consistent with the initial consent provided on the Platform.
• Use customer information for purposes unrelated to the dealership transaction between the dealership and the customer.
• Misuse the Platform by engaging in practices inconsistent with its intended purpose.
• Manipulate or exploit the Platform's software or bidding process.`,
    },
    {
      id: "access-customer-data",
      title: "3. Access and Use of Customer Data",
      icon: Lock,
      content: `3.1 Permitted Use: Customer data accessed through the Platform may only be used for evaluating vehicles and submitting bids. Any unauthorized use, including resale or marketing without explicit customer consent, is prohibited.

3.2 Data Protection: The Dealership agrees to handle customer data in compliance with the California Consumer Privacy Act (CCPA) and applicable federal privacy laws. Industry-standard security measures, such as encryption and access controls, must be implemented to prevent unauthorized disclosure or breaches.

3.3 Data Accuracy: Amacar does not guarantee the accuracy of customer-provided vehicle details. Dealerships are responsible for verifying all relevant information during final inspections and transactions.

3.4 Confidentiality: The Dealership agrees not to disclose Amacar's proprietary information, including algorithms, trade secrets, and customer lists, to any third parties without prior written consent.

3.5 Data Breach Notification: In the event of a data breach involving customer information, the Dealership must notify Amacar and affected customers within 48 hours and comply with all applicable legal notification requirements.`,
    },
    {
      id: "auction-transaction",
      title: "4. Auction and Transaction Process",
      icon: Gavel,
      content: `4.1 Bid Submission: Bids must be submitted within the auction period specified by the Platform. Upon the expiration of the designated time, the auction will automatically close, and any bids submitted thereafter will not be accepted.

4.2 Final Bid Acceptance: Once a customer accepts a bid, Amacar will provide the Dealership with the customer's information to facilitate further transaction processing. The Dealership is obligated to make a good faith effort to honor the bid, pending the final vehicle inspection and mutual agreement on any remaining terms. However, if the customer and the Dealership are unable to agree on specific terms or other factors that arise during the transaction process, the Dealership is not required to complete the purchase.

4.3 Transaction Completion: All final negotiations, agreements, and sales transactions occur directly between the Dealership and the customer outside of the Platform. The Dealership is responsible for completing these transactions in a professional and timely manner.

4.4 Customer Disputes: Any disputes arising between the Dealership and the customer must be resolved directly by the parties involved. Amacar is not responsible for mediating disputes.`,
    },
    {
      id: "compliance-laws",
      title: "5. Compliance with Laws",
      icon: Scale,
      content: `5.1 Legal Obligations: The Dealership agrees to comply with all applicable local, state, and federal laws, including but not limited to automotive sales regulations, privacy laws (e.g., CCPA), and consumer protection laws.

5.2 Licenses and Permits: The Dealership is responsible for obtaining and maintaining all necessary licenses, permits, and registrations required for its operations.

5.3 Fair Practices: The Dealership must not engage in fraudulent practices, misrepresentation, or any conduct that could harm customers or Amacar's reputation.`,
    },
    {
      id: "limitation-liability",
      title: "6. Limitation of Liability",
      icon: AlertTriangle,
      content: `6.1 Amacar's Role: Amacar is a facilitator and is not a party to transactions between Dealerships and customers. Amacar is not liable for any disputes, financial losses, or damages arising from transactions conducted through the Platform.

6.2 Indemnification: The Dealership agrees to indemnify and hold harmless Amacar from any claims, damages, or liabilities resulting from the Dealership's use of the Platform, including but not limited to data breaches, bidding disputes, or violations of applicable laws.`,
    },
    {
      id: "termination",
      title: "7. Termination",
      icon: Settings,
      content: `7.1 Termination by Amacar: Amacar reserves the right to terminate this Agreement if the Dealership violates any terms or applicable laws. Termination may also occur for repeated non-compliance with Platform policies.

7.2 Voluntary Termination: The Dealership may terminate this Agreement by providing written notice to Amacar. Any pending transactions must still be completed.

7.3 Post-Termination Obligations: All obligations related to confidentiality, indemnification, and data handling shall survive termination of this Agreement. Upon termination, the Dealership must immediately cease all use of the Platform and securely delete or destroy any customer data obtained through it, in compliance with applicable data protection laws and Amacar's policies. Customer information shared through the Platform may have been integrated into the Dealership's CRM system, unless the Dealership exclusively uses Amacar's CRM. In such cases, the Dealership remains responsible for ensuring the secure deletion of all customer data in accordance with this Agreement and applicable laws.`,
    },
    {
      id: "platform-fees",
      title: "8. Platform Usage Fees",
      icon: DollarSign,
      content: `8.1 Fee Structure: If applicable, the Dealership agrees to pay all fees associated with using the Platform, as outlined in a separate fee schedule provided by Amacar.

8.2 Non-Payment Consequences: Failure to pay usage fees may result in suspension or termination of Platform access, as well as additional penalties or collection actions. Fees are charged to dealerships on the first day of each month. In the event of non-payment, the Dealership will be notified, and the Platform may suspend access until payment is made. The Dealership may cancel the Agreement at any time by providing written notice, subject to payment of any outstanding fees due for the current billing period.`,
    },
    {
      id: "dispute-resolution",
      title: "9. Dispute Resolution",
      icon: Gavel,
      content: `9.1 Arbitration Clause: Disputes arising from this Agreement will be resolved through binding arbitration under the rules of the American Arbitration Association. Arbitration will take place in [City Of---------------, State--------], and costs will be shared equally unless determined otherwise by the arbitrator.

9.2 Governing Law and Venue: This Agreement is governed by the laws of the State of California and applicable federal laws. Any disputes not resolved through arbitration will be subject to the exclusive jurisdiction of the courts in California.`,
    },
    {
      id: "general-provisions",
      title: "10. General Provisions",
      icon: FileText,
      content: `10.1 Amendments: Amacar reserves the right to update or modify this Agreement at any time. Continued use of the Platform constitutes acceptance of the updated terms.

10.2 Entire Agreement: This Agreement constitutes the entire understanding between the parties regarding the use of the Platform and supersedes all prior agreements, representations, and understandings.

10.3 Digital Acceptance: By signing or electronically accepting this Agreement, the Dealership acknowledges that it is as binding as a handwritten signature.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Dealership Agreement
                </h1>
                <p className="text-slate-600 mt-1">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Agreement Introduction
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  This Dealership Agreement ("Agreement") is entered into by and between Amacar LLC, a company organized and existing under the California Corporation Code, and [Insert the dealership name], a dealership entity ("Dealership" or "You").
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={section.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {section.title}
                  </h2>
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Acknowledgment Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Acknowledgment and Acceptance
                </h3>
                <p className="text-slate-700 leading-relaxed mb-6">
                  By signing below, the Dealership acknowledges that it has read, understood, and agrees to be bound by this Agreement.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Dealership Name:
                      </label>
                      <div className="border-b border-slate-300 h-8"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Authorized Representative:
                      </label>
                      <div className="border-b border-slate-300 h-8"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Signature:
                      </label>
                      <div className="border-b border-slate-300 h-8"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Date:
                      </label>
                      <div className="border-b border-slate-300 h-8"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Amacar LLC Representative:
                      </label>
                      <div className="border-b border-slate-300 h-8"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Title:
                      </label>
                      <div className="border-b border-slate-300 h-8"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Date:
                      </label>
                      <div className="border-b border-slate-300 h-8"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Contact Us
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  If you have any questions about this Dealership Agreement or need
                  assistance, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-slate-700">
                    <strong>Company:</strong> Amacar LLC
                  </p>
                  <p className="text-slate-700">
                    <strong>Email:</strong> info@amacar.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DealershipAgreement;
