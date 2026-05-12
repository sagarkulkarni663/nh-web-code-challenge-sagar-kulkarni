import { CLINICIANS, type Clinician } from "../data/clinicians";
import { LABS, type Lab } from "../data/labs";
import { getDistance, type DistanceMode } from "./distance";

export type Segment = { from: string; to: string; miles: number };

export type OptimizerResult = {
  clinician: Clinician;
  totalMiles: number;
  lab?: Lab;
  segments: Segment[];
};

export const findBestClinician = (
  patientAddress: string,
  includeLab: boolean,
  mode: DistanceMode,
) => {
  let best: OptimizerResult | null = null;

  for (const clinician of CLINICIANS) {
    const homeToPatient = getDistance(clinician.address, patientAddress, mode);

    if (!includeLab) {
      const patientToHome = getDistance(patientAddress, clinician.address, mode);
      const result: OptimizerResult = {
        clinician,
        totalMiles: homeToPatient + patientToHome,
        segments: [
          { from: clinician.address, to: patientAddress, miles: homeToPatient },
          { from: patientAddress, to: clinician.address, miles: patientToHome },
        ],
      };
      if (!best || result.totalMiles < best.totalMiles) best = result;
    } else {
      for (const lab of LABS) {
        const patientToLab = getDistance(patientAddress, lab.address, mode);
        const labToHome = getDistance(lab.address, clinician.address, mode);
        const result: OptimizerResult = {
          clinician,
          lab,
          totalMiles: homeToPatient + patientToLab + labToHome,
          segments: [
            { from: clinician.address, to: patientAddress, miles: homeToPatient },
            { from: patientAddress, to: lab.address, miles: patientToLab },
            { from: lab.address, to: clinician.address, miles: labToHome },
          ],
        };
        if (!best || result.totalMiles < best.totalMiles) best = result;
      }
    }
  }

  return best!;
};
