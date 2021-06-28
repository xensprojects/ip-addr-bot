import axios from "axios";

const base_ip = "https://ipapi.co/[ip]/json/";

const parseInfo = (info) => {
  let final = "";
  if (info.error) {
    final += `❌ ${info.reason}`;
    return final;
  }

  final += `Country: *${info.country_name}\n*`;
  final += `State: *${info.region}\n*`;
  final += `City: *${info.city}\n*`;
  final += `Provider: *${info.org}\n*`;

  return final;
};

const getIPInfo = async (ip) => {
  const api_link = base_ip.replace(/\[ip\]/, ip);
  try {
    const { data } = await axios.get(api_link);
    return parseInfo(data);
  } catch (e) {
    return "An error occurred";
  }
};

export { getIPInfo };
