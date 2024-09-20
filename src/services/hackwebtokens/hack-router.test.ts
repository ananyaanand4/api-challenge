import { describe, expect, it } from "@jest/globals";
import { post } from "../../testTools";

import { StatusCode } from "status-code-enum";

describe("POST /hack/encode/", () => {
    it("returns correct token for user", async () => {
        const response = await post("/hack/encode/").send({
            "userId": "John",
            "data": {
              "role": "admin",
              "access_time": 5
            }
          })
        .expect(StatusCode.SuccessOK);

        expect(JSON.parse(response.text)).toMatchObject({
            token: "139c801654de528b65d92a840e0ce25c6bf9f84c55228b7dbc5534e5696ef12d46460d2b713433f8a5bf7ed316565e0d8be3cf06efe0a87e47b5ae5c03b75fec",
            context: {}
        });
    });
});

describe("POST /hack/decode/", () => {
    it("returns correct user for token", async () => {
        const response = await post("/hack/decode/").send({
            "token": "139c801654de528b65d92a840e0ce25c6bf9f84c55228b7dbc5534e5696ef12d46460d2b713433f8a5bf7ed316565e0d8be3cf06efe0a87e47b5ae5c03b75fec",
            "context": {}
          })
        .expect(StatusCode.SuccessOK);

        expect(JSON.parse(response.text)).toMatchObject({
            userId: "John",
            data: {
              role: "admin",
              access_time: 5
            }
        });
    });
});