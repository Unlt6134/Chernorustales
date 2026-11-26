extends Control

const GREEN := Color("#9bd49b")
const TEXT := Color("#c4d2c2")
const MUTED := Color("#718273")
const DARK := Color("#071008")
const PANEL := Color("#101b12")

var discovered_stash := false
var radio_heard := false
var current_page := "room"
var page_root: Control

func _ready() -> void:
	show_room()

func clear_page() -> void:
	if page_root and is_instance_valid(page_root):
		page_root.queue_free()
	page_root = Control.new()
	page_root.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	add_child(page_root)

func make_label(value: String, size: int = 22, color: Color = TEXT) -> Label:
	var label := Label.new()
	label.text = value
	label.add_theme_font_size_override("font_size", size)
	label.add_theme_color_override("font_color", color)
	label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	return label

func make_button(value: String, action: Callable) -> Button:
	var button := Button.new()
	button.text = value
	button.custom_minimum_size = Vector2(0, 58)
	button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	button.add_theme_font_size_override("font_size", 21)
	button.add_theme_color_override("font_color", GREEN)
	button.add_theme_color_override("font_hover_color", Color.WHITE)
	button.add_theme_stylebox_override("normal", make_button_style(false))
	button.add_theme_stylebox_override("hover", make_button_style(true))
	button.pressed.connect(action)
	return button

func make_button_style(hovered: bool) -> StyleBoxFlat:
	var style := StyleBoxFlat.new()
	style.bg_color = Color("#1b2b1d") if hovered else Color("#0c160e")
	style.border_color = Color("#83c987")
	style.set_border_width_all(1)
	style.content_margin_left = 16
	style.content_margin_right = 16
	style.content_margin_top = 10
	style.content_margin_bottom = 10
	return style

func build_page(title_text: String, subtitle: String = "") -> VBoxContainer:
	clear_page()
	var background := ColorRect.new()
	background.color = DARK
	background.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	page_root.add_child(background)

	var outer := MarginContainer.new()
	outer.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	outer.add_theme_constant_override("margin_left", 24)
	outer.add_theme_constant_override("margin_right", 24)
	outer.add_theme_constant_override("margin_top", 20)
	outer.add_theme_constant_override("margin_bottom", 20)
	page_root.add_child(outer)

	var column := VBoxContainer.new()
	column.add_theme_constant_override("separation", 14)
	outer.add_child(column)

	var header := PanelContainer.new()
	var header_style := StyleBoxFlat.new()
	header_style.bg_color = PANEL
	header_style.border_color = Color("#35563a")
	header_style.set_border_width_all(1)
	header.add_theme_stylebox_override("panel", header_style)
	column.add_child(header)

	var heading := VBoxContainer.new()
	heading.add_theme_constant_override("separation", 5)
	heading.add_child(make_label("CHERNARUS TALES  /  PERSONAL ARCHIVE", 16, MUTED))
	heading.add_child(make_label(title_text, 32, GREEN))
	if subtitle != "":
		heading.add_child(make_label(subtitle, 16, MUTED))
	header.add_child(heading)

	var content := VBoxContainer.new()
	content.add_theme_constant_override("separation", 12)
	content.size_flags_vertical = Control.SIZE_EXPAND_FILL
	column.add_child(content)
	return content

func show_room() -> void:
	current_page = "room"
	var content := build_page("ЗАБРОШЕННЫЙ ДОМ", "ЧЕРНОРУСЬ  •  НЕИЗВЕСТНАЯ ДАТА")
	content.add_child(make_label("\nТы находишь убежище в старом доме.\nНа столе мерцает экран ноутбука.\nВ комнате тихо, только ветер стучит в разбитое окно.", 25))
	content.add_child(make_label("ПРЕДМЕТ: старый ноутбук  /  питание нестабильно", 17, MUTED))
	content.add_child(make_button("[ ВЗЯТЬСЯ ЗА НОУТБУК ]", show_laptop))
	content.add_spacer()
	content.add_child(make_label("MOBILE STORY PROTOTYPE  •  BUILD 0.1", 14, MUTED))

func show_laptop() -> void:
	current_page = "laptop"
	var content := build_page("TERMINAL  /  2004", "СИСТЕМА ЗАПУЩЕНА • ЛОКАЛЬНЫЙ АРХИВ")
	content.add_child(make_label("Рабочий стол\n\nПользователь: неизвестен\nПоследний вход: 17.11.2004", 20))
	content.add_child(make_button("📁  ЛИЧНЫЕ ЗАПИСИ", show_diary))
	content.add_child(make_button("📻  РАДИО  /  87.6 MHz", show_radio))
	content.add_child(make_button("🗺  ЗАПИСЬ О СХРОНЕ", show_stash))
	content.add_spacer()
	content.add_child(make_button("[ ЗАКРЫТЬ НОУТБУК ]", show_room))

func show_diary() -> void:
	current_page = "diary"
	var content := build_page("ЛИЧНЫЕ ЗАПИСИ", "ФАЙЛ: diary_01.txt  •  ОТКРЫТ")
	content.add_child(make_label("17 ноября 2004\n\nОпять слышал голоса на частоте 87.6. Не похоже на обычных мародёров.\n\nЕсли придётся уходить, я оставлю припасы в старом охотничьем домике к западу от Старого Собора. Координаты записал отдельно.\n\nНе доверяй первому, кто назовёт себя спасателем.", 21))
	content.add_spacer()
	content.add_child(make_button("[ НАЗАД К РАБОЧЕМУ СТОЛУ ]", show_laptop))

func show_radio() -> void:
	current_page = "radio"
	var content := build_page("РАДИОПРИЁМНИК", "87.6 MHz  •  СИГНАЛ СЛАБЫЙ")
	content.add_child(make_label("♫  Приёмник шипит. Сквозь помехи слышится далёкая музыка с кассеты.\n\n...шшшш...\n\n[ НАЧАЛО ПЕРЕДАЧИ ]\n\n", 21))
	if radio_heard:
		content.add_child(make_label("«Если ты нашёл ноутбук... проверь охотничий домик. Он оставил там не только еду. Не подходи к северному блокпосту».\n\n...сигнал потерян...", 22, GREEN))
	else:
		content.add_child(make_button("[ НАСТРОИТЬ ЧАСТОТУ / СЛУШАТЬ ]", func():
			radio_heard = true
			show_radio()
		))
	content.add_spacer()
	content.add_child(make_button("[ НАЗАД ]", show_laptop))

func show_stash() -> void:
	current_page = "stash"
	var content := build_page("ЗАПИСЬ О СХРОНЕ", "ФАЙЛ: location_note.txt")
	if discovered_stash:
		content.add_child(make_label("Метка добавлена в журнал:\n\nОхотничий домик к западу от Старого Собора.\n\nВ настоящей версии здесь откроется карта и поиск тайника.", 22, GREEN))
	else:
		content.add_child(make_label("В файле короткая записка:\n\n«Если читаешь это, значит ноутбук пережил меня. Схрон у старого охотничьего домика. Ищи под полом.\n\nЗапомни: северный блокпост обходи стороной».\n\nОткрыть запись в журнале находок?", 21))
		content.add_child(make_button("[ СОХРАНИТЬ ПОДСКАЗКУ В ЖУРНАЛ ]", func():
			discovered_stash = true
			show_stash()
		))
	content.add_spacer()
	content.add_child(make_button("[ НАЗАД К РАБОЧЕМУ СТОЛУ ]", show_laptop))
