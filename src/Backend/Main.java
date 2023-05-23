package Backend;

import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        Express app = new Express();
        Database database = new Database();//Todoey.db creates in SQLite

        app.get("/rest/items", (req, res) -> {
            List<Item> items =  database.getItems();
            res.json(items);
        });

        app.get("/rest/items/:id", (request, response) -> {
            try {
                int id = Integer.parseInt(request.getParam("id"));//we have to typecast to integer because Param is always a string

                Item item = database.getItemById(id);
                response.json(item);

            } catch (NumberFormatException e) {
                e.printStackTrace();
            }
        });

        app.post("/rest/items", (request, response) -> {
            Item item = (Item) request.getBody(Item.class);
            database.createItem(item);
        });
        app.delete("/rest/items/:id", (request, response) -> {
            Item item = (Item) request.getBody(Item.class);
            database.deleteItem(item);
        });

        app.put("/rest/items/:id", (request, response) -> {
            Item item = (Item) request.getBody(Item.class);
            database.updateItem(item);
            response.send("Item updated");

        });
        app.post("/rest/items/:id", (request, response) -> {
            Item item = (Item) request.getBody(Item.class);
            database.updateItemsFinished(item);
            response.send("Item updated");

        });

        try {
            app.use(Middleware.statics(Paths.get("src/Frontend").toString()));//serving static files
        } catch (IOException e) {
            e.printStackTrace();
        }
        app.listen(4000);
        System.out.println("Server started on port 4000");


    }
}
