const AMULET_DATA = {
  'lpt-1': {
    code: 'รหัส: AM-001 (ภาพที่ 1 และ 2)',
    title: 'หลวงปู่ทวด วัดช้างให้ (เนื้อว่าน หลังยันต์)',
    temple: 'วัดช้างให้ จ.ปัตตานี',
    price: '400 บาท',
    img: 'images/lpt-front.jpg',
    images: [
      { src: 'images/lpt-front.jpg', label: 'ภาพที่ 1: ด้านหน้า' },
      { src: 'images/lpt-back.jpg', label: 'ภาพที่ 2: ด้านหลังยันต์' }
    ],
    history:
      'สมเด็จเจ้าพะโคะ หรือ หลวงปู่ทวด เหยียบน้ำทะเลจืด เป็นพระมหาเถระผู้ทรงอภิญญาตั้งแต่สมัยกรุงศรีอยุธยา วัตถุมงคลสายวัดช้างให้ได้รับความเคารพศรัทธาสูงสุดทั่วประเทศ องค์นี้เป็นเนื้อว่านสีดำเข้มขลัง ด้านหน้าเป็นองค์หลวงปู่ทวดนั่งสมาธิบนฐานบัว ด้านหลังประทับอักขระยันต์คมชัด มาพร้อมกล่องกำมะหยี่สีแดง',
    buddhakhun:
      'โดดเด่นเป็นเลิศด้านนิรันตราย แคล้วคลาดปลอดภัยจากอุบัติเหตุและการเดินทาง เมตตามหานิยม ผู้ใหญ่ค้ำจุนอุปถัมภ์ ป้องกันภยันตรายทั้งปวง',
    katha: '“นะโม โพธิสัตโต อาคันติมายะ อิติภควา” (ตั้งนะโม 3 จบ แล้วสวดพระคาถา 3 จบ หรือ 9 จบ)'
  },
  'lps-1': {
    code: 'รหัส: AM-002 (ภาพที่ 3 และ 4)',
    title: 'หลวงพ่อโสธร ฉะเชิงเทรา (เนื้อผง พิมพ์สามเหลี่ยม)',
    temple: 'วัดโสธรวรารามวรวิหาร จ.ฉะเชิงเทรา',
    price: '440 บาท',
    img: 'images/lps-front.jpg',
    images: [
      { src: 'images/lps-front.jpg', label: 'ภาพที่ 3: องค์พระชัดๆ' },
      { src: 'images/lps-box.jpg', label: 'ภาพที่ 4: พร้อมกล่องเดิม' }
    ],
    history:
      'พระพุทธโสธร หรือ หลวงพ่อโสธร พระพุทธรูปคู่บ้านคู่เมืองฉะเชิงเทรา องค์นี้เป็นพระผงพุทธคุณพิมพ์สามเหลี่ยม องค์หลวงพ่อโสธรประทับนั่งสมาธิบนฐานบัว มีคำว่า "โสธร" ที่ฐาน มาพร้อมกล่องเดิมพิมพ์ทอง "หลวงพ่อโสธร ฉะเชิงเทรา"',
    buddhakhun:
      'เลื่องลือด้านโชคลาภ การค้าขายรุ่งเรือง เรียกทรัพย์สินเงินทอง การงานก้าวหน้า ขอพรสิ่งใดมักสำเร็จสมปรารถนา และคุ้มครองให้ครอบครัวร่มเย็นเป็นสุข',
    katha: '“อิติ อิติ อิติ โสธโร นะโมพุทธายะ ยะธาพุทโมนะ” (ตั้งนะโม 3 จบ แล้วสวดพระคาถา 3 จบ)'
  }
};

// Switch image between Front / Back on card
function switchCardImage(prefix, newSrc, btnEl) {
  const mainImg = document.getElementById(`main-img-${prefix}`);
  if (mainImg) {
    mainImg.src = newSrc;
  }
  const strip = btnEl.parentElement;
  strip.querySelectorAll('.thumb-btn').forEach((b) => b.classList.remove('active'));
  btnEl.classList.add('active');
}

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const amuletCards = document.querySelectorAll('.amulet-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.getAttribute('data-filter');

    amuletCards.forEach((card) => {
      if (target === 'all' || card.getAttribute('data-category') === target) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Loupe Magnifier Effect (แว่นขยายส่องพระ)
const toggleLoupeInput = document.getElementById('toggleLoupe');
const imageContainers = document.querySelectorAll('.amulet-image-container');

imageContainers.forEach((container) => {
  const lens = container.querySelector('.loupe-lens');
  const img = container.querySelector('.amulet-img');
  const zoomLevel = 2.6;

  function moveLens(e) {
    if (!toggleLoupeInput.checked) {
      lens.style.display = 'none';
      return;
    }

    lens.style.display = 'block';
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    let x = clientX - rect.left;
    let y = clientY - rect.top;

    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));

    const lensRadius = lens.offsetWidth / 2;
    lens.style.left = `${x - lensRadius}px`;
    lens.style.top = `${y - lensRadius}px`;

    lens.style.backgroundImage = `url('${img.src}')`;
    lens.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;

    const bgX = -(x * zoomLevel - lensRadius);
    const bgY = -(y * zoomLevel - lensRadius);
    lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
  }

  container.addEventListener('mousemove', moveLens);
  container.addEventListener('touchmove', moveLens, { passive: true });
  container.addEventListener('mouseleave', () => {
    lens.style.display = 'none';
  });
});

// Modal Control
function openAmuletModal(id) {
  const data = AMULET_DATA[id];
  if (!data) return;

  document.getElementById('modalCode').textContent = data.code;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalTemple').textContent = data.temple;
  document.getElementById('modalPrice').textContent = data.price;
  const modalImg = document.getElementById('modalImg');
  modalImg.src = data.img;
  document.getElementById('modalHistory').textContent = data.history;
  document.getElementById('modalBuddhakhun').textContent = data.buddhakhun;
  document.getElementById('modalKatha').textContent = data.katha;

  // Populate modal thumbnails
  const thumbsContainer = document.getElementById('modalThumbs');
  thumbsContainer.innerHTML = '';
  if (data.images && data.images.length) {
    data.images.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = `modal-thumb-item ${idx === 0 ? 'active' : ''}`;
      div.innerHTML = `<img src="${item.src}" alt="${item.label}" title="${item.label}" />`;
      div.onclick = () => {
        modalImg.src = item.src;
        thumbsContainer.querySelectorAll('.modal-thumb-item').forEach((el) => el.classList.remove('active'));
        div.classList.add('active');
      };
      thumbsContainer.appendChild(div);
    });
  }

  const rentBtn = document.getElementById('modalRentBtn');
  rentBtn.onclick = () => {
    closeAmuletModal();
    selectAmuletForInquiry(`${data.title} (ราคา ${data.price})`);
  };

  document.getElementById('amuletModal').classList.add('open');
}

function closeAmuletModal() {
  document.getElementById('amuletModal').classList.remove('open');
  document.getElementById('modalImgContainer').classList.remove('zoomed');
}

document.getElementById('modalImgContainer').addEventListener('click', function () {
  this.classList.toggle('zoomed');
});

// Inquiry Selection Banner
function selectAmuletForInquiry(name) {
  const banner = document.getElementById('inquiryBanner');
  const label = document.getElementById('selectedAmuletName');
  label.textContent = name;
  banner.style.display = 'flex';
}

function clearInquiry() {
  document.getElementById('inquiryBanner').style.display = 'none';
}

// Copy Contact Info
function copyText(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btnElement.textContent;
    btnElement.textContent = '✓ คัดลอกแล้ว';
    setTimeout(() => {
      btnElement.textContent = original;
    }, 1800);
  });
}
