
export function createInteractiveButton(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    style: Phaser.Types.GameObjects.Text.TextStyle,
    pointerColor: string,
    pressedColor: string,
    onClick?: () => void
  ): Phaser.GameObjects.Text {
    const button = scene.add.text(x, y, text, style).setOrigin(0.5);
    button.setInteractive({ cursor: 'url(assets/cursors/pointer.png), pointer' });
    button.setShadow(0, 0, '#000', 1, false, true)
    button.setFontFamily('saiyan');

    const originalColor = style.color || '#fff';
    
    button.on('pointerover', () => { button.setColor(pointerColor); });
    button.on('pointerout', () => { button.setColor(originalColor); });
    button.on('pointerdown', () => {
        button.setColor(pressedColor);
        button.setShadow(0, 0, '#000', 2, false, true)

    });
    button.on('pointerup', () => {
        if (onClick) onClick();
        button.setShadow(0, 0, '#000', 1, false, true)

    });
  
    return button;
  }

  export function createTitleText(scene: Phaser.Scene, x, y, text, fontSize, color) {
      const styledText = scene.add.text(x, y, text);
      styledText.setOrigin(0.5, 0.5);
      styledText.setFontFamily('saiyan');
      styledText.setFontSize(fontSize);
      styledText.setShadow(2, 2, '#000', 2, false, true)
      styledText.setColor(color)
    
      return styledText
  }      
