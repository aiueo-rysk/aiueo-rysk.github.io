import { z } from 'zod';

// 銘柄コード
const ProductCode = z.string().min(4).max(4)

// 銘柄名
const ProductName = z.string().min(1).max(50)

// TOPIX-17の業種区分
export const TOPIX_17INDUSTRY = [
    "食品",
    "エネルギー資源",
    "建設・資材",
    "素材・化学",
    "医薬品",
    "自動車・輸送機",
    "鉄鋼・非鉄",
    "機械",
    "電機・精密",
    "情報通信・サービスその他",
    "電気・ガス",
    "運輸・物流",
    "商社・卸売",
    "小売",
    "銀行",
    "金融（除く銀行）",
    "不動産",
] as const;

const Topix17Industry = z.enum(
    TOPIX_17INDUSTRY
    );

// 33業種区分
export const INDUSTRY33 = [
    "水産・農林業",
    "食料品",
    "鉱業",
    "石油・石炭製品",
    "建設業",
    "金属製品",
    "ガラス・土石製品",
    "繊維製品",
    "パルプ・紙",
    "化学",
    "医薬品",
    "ゴム製品",
    "輸送用機器",
    "鉄鋼",
    "非鉄金属",
    "機械",
    "電気機器",
    "精密機器",
    "その他製品",
    "情報・通信業",
    "サービス業",
    "電気・ガス業",
    "陸運業",
    "海運業",
    "空運業",
    "倉庫・運輸関連業",
    "卸売業",
    "小売業",
    "銀行業",
    "証券、商品先物取引業",
    "保険業",
    "その他金融業",
    "不動産業",
] as const
const Industry33 = z.enum(INDUSTRY33);

// 市場・商品区分
export const MARKET = [
    "PRO Market",
    "グロース（外国株式）",
    "グロース（内国株式）",
    "スタンダード（外国株式）",
    "スタンダード（内国株式）",
    "プライム（外国株式）",
    "プライム（内国株式）"
] as const;
const Market = z.enum(MARKET)

// 銘柄
const Product = z.object({
    productCode: ProductCode,
    productName: ProductName,
    topix17Industry: Topix17Industry,
    market: Market,
});

// 株数
const Stock = z.number().min(0);

// 簿価
const PurchasePrice = z.number().min(0)

// 保有株
const HoldingStock = Product.extend({
    stock: Stock,
    purchasePrice: PurchasePrice
});

// ポートフォリオ
const Portfolio = z.object({
    portfolioName: z.string().min(1).max(50),
    holdingStocks: z.array(HoldingStock),
});

export type Topix17Industry = z.infer<typeof Topix17Industry>;
export type Product = z.infer<typeof Product>;
export type HoldingStock = z.infer<typeof HoldingStock>;
export type Portfolio = z.infer<typeof Portfolio>;
