import {NhostClient} from "@nhost/nhost-js";
import {nhost_region, nhost_url} from "./consts.js";

export const nhost = new NhostClient({
    subdomain: nhost_url,
    region: nhost_region
})
