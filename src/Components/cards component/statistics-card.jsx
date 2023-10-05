import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import PropTypes from "prop-types";

export function StatisticsCard({ color, icon, title, footer }) {
  return (
    <Card>
      <div className="flex ">
      <CardHeader
        variant="gradient"
        color={color}
        className=" -mt-4 grid h-16 w-16 place-items-center"
      >
        {/* {icon} */}
        <i className="pi pi-telegram" style={{ color: 'white', fontSize: '2.5rem' }}></i>
      </CardHeader>

      <CardBody className="p-4 flex justify-center">
        <Typography variant="small" className="font-normal  font-yekan text-blue-gray-600">
          {title}
        </Typography>
        {/* <Typography variant="h4" color="blue-gray">
          {value}
        </Typography> */}
      </CardBody>
      </div>

      {footer && (
        <CardFooter className="border-t text-center border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  // value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
