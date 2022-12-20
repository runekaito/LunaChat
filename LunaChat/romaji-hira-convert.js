"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const romaji_hira_table_1 = require("./romaji-hira-table");
exports.default = (input) => {
    let result = "";
    let state = romaji_hira_table_1.default;
    let pending = "";
    let dual = false;
    let offset = 0;
    const size = input.length;
    while (offset < size) {
        const char = input[offset];
        if (char in state) {
            const value = state[char];
            if (typeof value === "string") {
                if (dual) {
                    result += "っ";
                    dual = false;
                }
                result += value;
                pending = "";
                state = romaji_hira_table_1.default;
            }
            else {
                state = value;
                pending = char;
            }
            offset += 1;
            continue;
        }
        if (dual) {
            result += pending + pending;
            pending = "";
            state = romaji_hira_table_1.default;
            dual = false;
            continue;
        }
        switch (pending) {
            case char:
                dual = true;
                state = romaji_hira_table_1.default;
                continue;
            case "n":
                result += "ん";
                pending = "";
                state = romaji_hira_table_1.default;
                continue;
            case "":
                result += char;
                offset += 1;
                continue;
        }
        result += pending;
        pending = "";
        state = romaji_hira_table_1.default;
        continue;
    }
    if (dual) {
        pending += pending;
    }
    return result + pending;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9tYWppLWhpcmEtY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvbWFqaS1oaXJhLWNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyREFBOEM7QUFFOUMsa0JBQWUsQ0FBQyxLQUFhLEVBQUUsRUFBRTtJQUMvQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsSUFBSSxLQUFLLEdBQVEsMkJBQVcsQ0FBQztJQUM3QixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNmLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDMUIsT0FBTyxNQUFNLEdBQUcsSUFBSSxFQUFFO1FBQ3BCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixJQUFJLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDakIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUM3QixJQUFJLElBQUksRUFBRTtvQkFDUixNQUFNLElBQUksR0FBRyxDQUFDO29CQUNkLElBQUksR0FBRyxLQUFLLENBQUM7aUJBQ2Q7Z0JBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQztnQkFDaEIsT0FBTyxHQUFHLEVBQUUsQ0FBQztnQkFDYixLQUFLLEdBQUcsMkJBQVcsQ0FBQzthQUNyQjtpQkFBTTtnQkFDTCxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNkLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDaEI7WUFDRCxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQ1osU0FBUztTQUNWO1FBQ0QsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM1QixPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2IsS0FBSyxHQUFHLDJCQUFXLENBQUM7WUFDcEIsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUNiLFNBQVM7U0FDVjtRQUNELFFBQVEsT0FBTyxFQUFFO1lBQ2YsS0FBSyxJQUFJO2dCQUNQLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ1osS0FBSyxHQUFHLDJCQUFXLENBQUM7Z0JBQ3BCLFNBQVM7WUFDWCxLQUFLLEdBQUc7Z0JBQ04sTUFBTSxJQUFJLEdBQUcsQ0FBQztnQkFDZCxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNiLEtBQUssR0FBRywyQkFBVyxDQUFDO2dCQUNwQixTQUFTO1lBQ1gsS0FBSyxFQUFFO2dCQUNMLE1BQU0sSUFBSSxJQUFJLENBQUM7Z0JBQ2YsTUFBTSxJQUFJLENBQUMsQ0FBQztnQkFDWixTQUFTO1NBQ1o7UUFDRCxNQUFNLElBQUksT0FBTyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDYixLQUFLLEdBQUcsMkJBQVcsQ0FBQztRQUNwQixTQUFTO0tBQ1Y7SUFDRCxJQUFJLElBQUksRUFBRTtRQUNSLE9BQU8sSUFBSSxPQUFPLENBQUM7S0FDcEI7SUFDRCxPQUFPLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFDMUIsQ0FBQyxDQUFDIn0=