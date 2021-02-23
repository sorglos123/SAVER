import * as mariadb from 'mariadb';
const pool = mariadb.createPool({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASS, database: process.env.DB, connectionLimit: 5 });

export class Item {
    receipt_id: number;
    product_name: string;
    price: number;
    category: string;
    volume: number;

    constructor(receipt_id: number, product_name: string, price: number, category: string, volume: number) {
        this.receipt_id = receipt_id;
        this.product_name = product_name;
        this.price = price;
        this.category = category;
        this.volume = volume;
    }

}

export async function getDates(uid: number) {
    var conn;
    console.log("getting dates");
    try {
        conn = await pool.getConnection();
        const res = await conn.query("SELECT receipt_date from receipts WHERE user_id = ?;", [uid]);
        if (res == 0) {
            console.log("no dates");
            throw new Error("no dates");
        }
        else {
            return res;
        }
    } catch (error) {
        console.log(error);
    } finally {
        console.log("trying to close");
        if (conn != null) {
            conn.end();
        }
    }
};

export async function getUserReceipts(uid: number) {
    var conn;
    console.log('Fetching all recipes...');
    try {
        conn = await pool.getConnection();
        const res = await conn.query("SELECT receipt_id, total_value, receipt_date, supermarket FROM receipts \
    WHERE user_id = ?;", [uid]);
        if (res == 0) {
            console.log("No receipts found!");
            throw new Error("There were no receipts to fetch.");
        }
        else {
            return res;
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        console.log("trying to close");
        if (conn != null) {
            conn.end();
        }
    }
};

    export async function getReceipts(uid: number, date: string) {
        var conn;

        console.log("trying to get receipts");
        try {
            conn = await pool.getConnection();
            const res = await conn.query("SELECT receipt_id, total_value, supermarket FROM receipts \
        WHERE receipt_date = DATE(?) &&  user_id = ?;", [date, uid]);
            if (res == 0) {
                console.log("no dates");
                throw new Error("no dates");
            }
            else {

                return res;

            }

        } catch (error) {
            console.log(error);
        }
        finally {
            console.log("trying to close");
            if (conn != null) {
                conn.end();
            }
        }

    };

    export async function getItems(receipts: any) {
        var conn;
        let items: Item[] = [];
        console.log("trying to get Items");
        console.log(receipts[0]["receipt_id"]);
        try {
            conn = await pool.getConnection();
            for (let index = 0; index < receipts.length; index++) {
                let recId = receipts[index]["receipt_id"];
                const res = await conn.query("SELECT receipt_id, product_name, price, category, volume FROM items INNER JOIN prices ON prices.item_id = items.item_id \
            INNER JOIN categories ON categories.item_id = items.item_id \
            INNER JOIN volumes ON volumes.item_id = items.item_id \
            WHERE receipt_id = ?;", recId);
                for (let index = 0; index < res.length; index++) {
                    items.push(new Item(res[index]["receipt_id"], res[index]["product_name"], res[index]["price"], res[index]["category"], res[index]["volume"]));

                }

            }
            return items;
        } catch (error) {
            console.log(error);
        } finally {
            console.log("trying to close");
            if (conn != null) {
                conn.end();
            }


        }
    };

