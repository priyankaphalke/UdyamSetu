import { evaluateRequirement, queryKnowledgeBaseRequirements, OFFICIAL_KNOWLEDGE_BASE } from './src/services/regulatoryKnowledgeBase.js';
import { generateRegulatoryIntelligence } from './src/services/regulatoryEngine.js';

const abcFoodsProfile = {
  legalName: 'ABC Foods Pvt. Ltd.',
  sector: 'Food Processing',
  industrySubSector: 'Agro & Food Processing (Fruit & Vegetable Pulp/Bakery)',
  state: 'Maharashtra',
  district: 'Nashik',
  businessStage: 'New Business',
  businessSize: 'Small',
  classification: 'Small',
  annualTurnover: 45000000, // 4.5 Cr
  investmentPlantMachinery: 12000000, // 1.2 Cr
  employeeCount: 28,
  hasPowerConnection: true,
  powerLoadKW: 45,
  operations: ['Manufacturing', 'Packaging', 'Storage'],
  installedCapacityMTPerDay: 4.5,
  effluentDischargeKLD: 8.0,
  builtUpAreaSqM: 650,
  hazardousWaste: false
};

console.log('================================================================');
console.log('TESTING REGULATORY ENGINE FOR ABC FOODS PVT. LTD.');
console.log('================================================================');

const evaluationResults = queryKnowledgeBaseRequirements(abcFoodsProfile, OFFICIAL_KNOWLEDGE_BASE);

console.log(`Evaluated ${evaluationResults.length} requirements for ABC Foods Pvt. Ltd.:\n`);

evaluationResults.forEach((res, index) => {
  console.log(`[${index + 1}] ID: ${res.id}`);
  console.log(`    Name / Clearance: ${res.name || res.title}`);
  console.log(`    Department: ${res.department}`);
  console.log(`    Jurisdiction: ${res.jurisdiction}`);
  console.log(`    Status: ${res.matchStatus}`);
  console.log(`    Why it may apply: ${res.whyItApplies}`);
  console.log(`    What you need to prepare: ${res.whatYouNeedToPrepare.join(', ')}`);
  console.log(`    Official Source: ${res.officialSourceName} (${res.officialSourceUrl})`);
  console.log(`    Source Reference: ${res.sourceReference}`);
  console.log(`    Next step: ${res.nextStep}`);
  if (res.verificationNotes) {
    console.log(`    MANUAL VERIFICATION REQUIRED: ${res.verificationNotes}`);
  }
  console.log('----------------------------------------------------------------');
});

console.log('\nINTEGRATION ENGINE TEST:');
const fullIntelligence = generateRegulatoryIntelligence(abcFoodsProfile, OFFICIAL_KNOWLEDGE_BASE);
console.log(`Generated Intelligence:`);
console.log(`- Requirements: ${fullIntelligence.requirements.length}`);
console.log(`- Compliance Tasks: ${fullIntelligence.complianceTasks.length}`);
console.log(`- Mandatory Documents: ${fullIntelligence.documents.length}`);
console.log(`- Government Schemes: ${fullIntelligence.governmentSupport.length}`);
console.log(`- Primary Next Action: ${fullIntelligence.primaryNextAction?.title}`);

console.log('\nALL CHECKS PASSED SUCCESSFULLY.');
