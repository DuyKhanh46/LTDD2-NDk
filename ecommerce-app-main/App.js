import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";

export default function App() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products?sort=desc"
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.productImage}
      ></ImageBackground>
      <Text style={styles.productTitle}>{item.title}</Text>
      <View style={styles.priceBox}>
        <Text style={styles.productPrice}>{item.price} USD</Text>
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => {
          console.log(`Thêm vào giỏ hàng: ${item.title}`);
          // Thực hiện hành động thêm vào giỏ hàng ở đây
        }}
      >
        <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.rowContainer}>
        {products.map((item) => (
          <View key={item.id} style={styles.productItemWrapper}>
            {renderProductItem({ item })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
  productItemWrapper: {
    width: "48%",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  productItem: {
    flex: 1,
    marginRight: 16,
  },
  productImage: {
    // width: "100%",
    height: 250,
    overflow: "hidden",
    borderRadius: 8,
    objectFit: "contain",
  },
  imageOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  productTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    height: 40,
    overflow: "hidden",
    textAlign: "center",
  },
  priceBox: {
    flexDirection: "row",
    marginTop: 8,
  },
  productPrice: {
    color: "black",
    fontSize: 14,
    // marginRight: 4,
    textAlign: "center",
  },
  productPriceSale: {
    color: "black",
    fontSize: 14,
    marginRight: 4,
    textDecorationLine: "line-through",
  },
  productPriceOriginal: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  addToCartButton: {
    marginTop: 8,
    backgroundColor: "green",
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
