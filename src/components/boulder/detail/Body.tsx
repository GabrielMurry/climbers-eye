import React from "react";
import ImageDisplay from "./ImageDisplay";
import DraftNotif from "../DraftNotif";
import InfoRow1 from "./InfoRow1";
import InfoRow2 from "./InfoRow2";
import InfoRow3 from "./InfoRow3";
import InfoRow4 from "./InfoRow4";
import { Boulder } from "../../../utils/types/boulder";
import { ChartData } from "../../../screens/boulder/BoulderScreen";
import { UserSendsData } from "../../../screens/boulder/types";
import { User } from "../../../utils/types/user";
import BoulderImage from "../BoulderImage";
import { useAppSelector } from "../../../redux/hooks";
import { selectSpraywall } from "../../../redux/features/spraywall/spraywallSelectors";

type BodyProps = {
  boulder: Boulder;
  chartData: ChartData[];
  userSendsData: UserSendsData[];
  user: User;
};

const Body: React.FC<BodyProps> = ({
  boulder,
  chartData,
  userSendsData,
  user,
}) => {
  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    return;
  }

  boulder.url;

  return (
    <>
      <BoulderImage
        boulderUri={boulder.url}
        spraywallUri={spraywall.url}
        width={boulder.width}
        height={boulder.height}
        shrinkScale={0.4}
      />
      <DraftNotif boulder={boulder} />
      <InfoRow1 boulder={boulder} userID={user.id} />
      <InfoRow2
        boulder={boulder}
        chartData={chartData}
        userSendsData={userSendsData}
      />
      <InfoRow3 boulder={boulder} />
      <InfoRow4 boulder={boulder} />
    </>
  );
};

export default Body;
