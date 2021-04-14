import {Flex} from "@chakra-ui/layout";
import {useEffect, useState} from "react";
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AnalyticClientLocation({clientData: {clients}}) {
  const [arrayOfCountries, setArrayOfCountries] = useState([]);

  useEffect(() => {
    clients.forEach(client => {
      setArrayOfCountries(prevState => {
        const isCountryInArr = prevState?.find(
          ({country}) => country === client.country
        );

        if (isCountryInArr) {
          return [
            ...prevState?.filter(({country}) => country !== client.country),
            {
              country: client.country,
              value: isCountryInArr.value + 1,
            },
          ];
        } else {
          return [...prevState, {country: client.country, value: 1}];
        }
      });
    });
  }, [clients]);

  return (
    <Flex
      minW={["39vw", "200px"]}
      maxW="100vw"
      minH="100%"
      maxH="100%"
      bg="white"
      rounded={16}
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        minW={["50vw", "200px"]}
        maxW="100%"
        minH={["50vw", "200px"]}
        maxH="100%"
      >
        <ResponsiveContainer width="100%" height="100%" aspect={1}>
          <PieChart>
            <Pie
              data={arrayOfCountries}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {arrayOfCountries.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Flex>
    </Flex>
  );
}
