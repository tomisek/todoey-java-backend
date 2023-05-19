package Backend;

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;

import java.sql.*;
import java.util.List;

public class Database {

    private Connection conn;//import java.sql.Connection, create variable conn(connection)
    //create constructor Database
    public Database() {
        try {
            conn = DriverManager.getConnection("jdbc:sqlite:Todoey.db");//get connection and in main.java we create new Database and Todoey.db creates automatically
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public List<Item>getItems(){
        List<Item>items = null;
        try {
            PreparedStatement statement = conn.prepareStatement("SELECT * FROM items");
            ResultSet rs = statement.executeQuery();

            Item[] usersFromRS = (Item[]) Utils.readResultSetToObject(rs,Item[].class);
            items = List.of(usersFromRS);


        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return items;
    }

    public Item getItemById(int id){
        Item item = null;

        try {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM items WHERE id =?");
        stmt.setInt(1,id);
        ResultSet res = stmt.executeQuery();

        Item[] itemsFromRs = (Item[]) Utils.readResultSetToObject(res, Item[].class);
        item = itemsFromRs[0];


        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return item;
    }

    public void createItem(Item item){
        PreparedStatement statement = null;
        try {
            statement = conn.prepareStatement("INSERT INTO items (text,finished) VALUES(?,?)");
            statement.setString( 1, item.getText());
            statement.setBoolean(2, item.getFinished());

            statement.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public void deleteItem(Item item){
        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM items WHERE id=?");
            stmt.setInt(1, item.getId());
            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public void updateItem(Item item) {
        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE items SET text = ? WHERE id = ?");
            //stmt.setBoolean(1, item.getFinished());
            stmt.setString(1, item.getText()); 
            stmt.setInt(2, item.getId());
            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}
