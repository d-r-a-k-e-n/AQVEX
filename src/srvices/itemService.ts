import axios from "axios";

export const itemService = {
  async getInfo() {
    const res = await axios.get(
      "https://ip-194-99-21-145-139178.vps.hosted-by-mvps.net/api/v1/products",
    );
    return res.data;
  },
};
