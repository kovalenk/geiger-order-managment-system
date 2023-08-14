import { BarrelColor } from "@/constants/barrelColor";
import { PointSize } from "@/constants/pointSize";
import { InkColor } from "@/constants/inkColor";

export interface ProductItemInterface {
  id: string;
  image: string;
  barrel_color: BarrelColor;
  trim_color: BarrelColor;
  point_size: PointSize;
  ink_color: InkColor;
  qty: number;
  net: number;
  sell: number;
  total: number;
  margin: number;
}
