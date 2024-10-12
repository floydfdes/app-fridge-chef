import * as React from 'react';

import { Avatar, Button, Card, Text } from 'react-native-paper';

import { StyleSheet } from 'react-native';

const RecipeCard = ({ recipe }) => (
    <Card style={styles.card}>
        <Card.Title titleVariant="titleLarge" title={recipe.name} subtitle={recipe.cuisine} />
        <Card.Content>
            <Text variant="bodyMedium">Rating: {recipe.rating}</Text>
            {/* Display other recipe details */}
            <Text variant="bodySmall">Difficulty: {recipe.difficulty}</Text>
            {/* Assuming ingredients is an array, render them */}
            <Text variant="bodySmall">Ingredients:</Text>
            {recipe.ingredients.map((ingredient, index) => (
                <Text key={index} variant="bodySmall">{`${index + 1}. ${ingredient}`}</Text>
            ))}
            <Text variant="bodySmall">Instructions:</Text>
            <Text variant="bodySmall">{recipe.instructions}</Text>
        </Card.Content>
        {/* Display cover image */}
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
        </Card.Actions>
    </Card>
);

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
        padding: 10,
    },
});

export default RecipeCard;
