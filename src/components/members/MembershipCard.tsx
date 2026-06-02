import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Member } from "@/lib/members-db";
import logoUrl from "@/assets/logo.svg";
import gombLogoUrl from "@/assets/gomb-logo.png";

interface MembershipCardProps {
  member: Member;
  viewMode?: "digital" | "print";
}

export function MembershipCard({ member, viewMode = "digital" }: MembershipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const valUrl = `${window.location.origin}/membros/carteirinha/validar?id=${member.id}`;
      QRCode.toDataURL(
        valUrl,
        {
          margin: 1,
          width: 250,
          color: {
            dark: "#0b1528", // deep navy
            light: "#ffffff",
          },
        },
        (err, url) => {
          if (!err && url) {
            setQrUrl(url);
          }
        }
      );
    }
  }, [member.id]);

  if (viewMode === "print") {
    /* PRINT MODE: HORIZONTAL SIDE-BY-SIDE CARDS */
    return (
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full max-w-5xl select-none print:flex-row print:gap-4 print:justify-center">
        {/* FRONT CARD (Horizontal) */}
        <div className="relative w-[460px] h-[280px] rounded-2xl p-5 bg-gradient-to-b from-[#FCFAF6] to-[#F5F2E9] border-2 border-[#C5A059] shadow-elegant flex flex-col justify-between overflow-hidden print:shadow-none print:border-[#C5A059]/80">
          {/* Background watermark */}
          <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
            <img src={logoUrl} alt="Watermark" className="w-[85%] h-[85%] object-contain" />
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#C5A059]/40 pb-2">
            <div className="flex items-center gap-2.5">
              <img src={logoUrl} alt="Brasão" className="h-9 w-9 drop-shadow-[0_0_4px_rgba(197,160,89,0.3)]" />
              <div>
                <h3 className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] leading-none font-bold">A.R.L.S.</h3>
                <h2 className="font-display text-sm font-bold text-[#0C1938] leading-tight">União Fraternal Nº 1</h2>
                <p className="text-[7px] uppercase tracking-[0.05em] text-muted-foreground">Filiada ao Grande Oriente Maçônico do Brasil</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-[#137333]/10 text-[#137333] border border-[#137333]/20 tracking-wider uppercase">
                Membro Regular
              </span>
            </div>
          </div>

          {/* Body content */}
          <div className="relative z-10 grid grid-cols-[100px_1fr] gap-4 items-center my-auto">
            {/* Left side: Photo & CIM */}
            <div className="flex flex-col items-center">
              <div className="w-[90px] h-[90px] rounded-xl overflow-hidden border border-[#C5A059] shadow-sm bg-black/5 flex items-center justify-center">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-display text-[#C5A059] text-3xl">G</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <span className="text-[7px] text-muted-foreground uppercase tracking-widest block">CIM</span>
                <span className="text-xs font-bold text-[#0C1938]">{member.cim}</span>
              </div>
            </div>

            {/* Right side: Member Details */}
            <div className="space-y-2">
              <div>
                <span className="text-[7px] text-muted-foreground uppercase tracking-wider block">Nome do Ir.·.</span>
                <h3 className="font-display text-lg font-bold text-[#0C1938] leading-tight truncate">
                  {member.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-[#C5A059]/20 pt-2">
                <div>
                  <span className="text-[7px] text-muted-foreground uppercase tracking-wider block">Grau Maçônico</span>
                  <span className="text-xs font-semibold text-[#C5A059]">{member.role}</span>
                </div>
                <div>
                  <span className="text-[7px] text-muted-foreground uppercase tracking-wider block">Data Iniciação</span>
                  <span className="text-xs font-medium text-[#0C1938]">{member.initiationDate}</span>
                </div>
                {member.office && (
                  <div className="col-span-2 border-t border-[#C5A059]/15 pt-1">
                    <span className="text-[7px] text-muted-foreground uppercase tracking-wider block">Cargo na Loja</span>
                    <span className="text-xs font-bold text-[#C5A059]">{member.office}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex justify-between items-end border-t border-[#C5A059]/20 pt-2 text-[7px] text-muted-foreground">
            <div>
              <p className="uppercase tracking-[0.15em] text-[#C5A059] font-bold leading-none mb-0.5">T.·. F.·. A.·.</p>
              <p className="text-[6px] font-semibold text-[#0C1938] leading-none">Filiada ao G.O.M.B.</p>
            </div>
            <div className="flex items-center gap-1.5">
              <p className="text-[6px]">Or.·. de Praia Grande — SP</p>
              <img src={gombLogoUrl} alt="Logo GOMB" className="h-8 w-8 object-contain" />
            </div>
          </div>
        </div>

        {/* BACK CARD (Horizontal) */}
        <div className="relative w-[460px] h-[280px] rounded-2xl p-5 bg-gradient-to-b from-[#FCFAF6] to-[#F5F2E9] border-2 border-[#C5A059] shadow-elegant flex flex-col justify-between overflow-hidden print:shadow-none print:border-[#C5A059]/80">
          {/* Background watermark */}
          <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
            <img src={logoUrl} alt="Watermark" className="w-[85%] h-[85%] object-contain" />
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center gap-2 border-b border-[#C5A059]/40 pb-2">
            <img src={logoUrl} alt="Brasão" className="h-7 w-7 drop-shadow-[0_0_4px_rgba(197,160,89,0.3)]" />
            <div>
              <h2 className="font-display text-xs font-bold text-[#0C1938] leading-tight">União Fraternal Nº 1</h2>
              <p className="text-[7px] uppercase tracking-[0.05em] text-muted-foreground">Validação de Credencial Maçônica</p>
            </div>
          </div>

          {/* Body content */}
          <div className="relative z-10 grid grid-cols-[100px_1fr] gap-5 items-center my-auto">
            {/* Left side: QR Code */}
            <div className="flex flex-col items-center">
              <div className="p-1.5 bg-white border border-[#C5A059]/40 rounded-xl shadow-sm max-w-[90px]">
                {qrUrl ? (
                  <img src={qrUrl} alt="QR Code" className="w-full h-auto" />
                ) : (
                  <div className="w-[75px] h-[75px] bg-gray-100 animate-pulse rounded-lg" />
                )}
              </div>
            </div>

            {/* Right side: Validação & Assinaturas */}
            <div className="space-y-4">
              <div>
                <p className="text-[#C5A059] uppercase tracking-[0.1em] text-[8px] font-bold">
                  Autenticação Eletrônica
                </p>
                <p className="text-[8px] text-muted-foreground leading-normal max-w-[280px]">
                  Use a câmera do celular para escanear o QR Code ao lado. O sistema verificará a situação cadastral do irmão em tempo real.
                </p>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-center">
                <div className="flex flex-col items-center">
                  <span className="font-serif italic text-[#C5A059] text-[10px] font-semibold leading-none mb-1">
                    Venerável Mestre
                  </span>
                  <span className="w-20 h-[0.5px] bg-[#C5A059]/40 mb-0.5" />
                  <span className="text-[6px] uppercase text-muted-foreground">Venerável Mestre</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-serif italic text-[#C5A059] text-[10px] font-semibold leading-none mb-1">
                    Secretário
                  </span>
                  <span className="w-20 h-[0.5px] bg-[#C5A059]/40 mb-0.5" />
                  <span className="text-[6px] uppercase text-muted-foreground">Secretário</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex justify-between items-end border-t border-[#C5A059]/20 pt-2 text-[7px] text-muted-foreground">
            <div>
              <p className="uppercase tracking-[0.1em] text-[#C5A059] font-bold leading-none mb-0.5">G.·. A.·. D.·. U.·.</p>
              <p className="text-[6px] font-semibold text-[#0C1938] leading-none">Filiada ao G.O.M.B.</p>
            </div>
            <div className="flex items-center gap-1.5">
              <p>Fundação: 09/03/2024</p>
              <img src={gombLogoUrl} alt="Logo GOMB" className="h-6 w-6 object-contain" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* DIGITAL MODE: VERTICAL FLIPPING CARD (iPhone dimensions matching screen) */
  return (
    <div className="phone-mockup-wrapper select-none">
      <div className="phone-mockup-scale">
        {/* Smartphone Mockup Bezel */}
        <div className="relative w-[420px] h-[820px] bg-neutral-950 rounded-[52px] p-3 shadow-elegant border-[4px] border-neutral-800 ring-2 ring-neutral-700/30 flex flex-col justify-between overflow-hidden">
          
          {/* Phone Notch / Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50 flex items-center justify-between px-4">
            <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full border border-neutral-800" />
            <div className="w-1.5 h-1.5 bg-blue-900/50 rounded-full" />
          </div>

          {/* Phone Side Buttons */}
          <div className="absolute -left-[4px] top-32 w-[3px] h-12 bg-neutral-800 rounded-r-xs" />
          <div className="absolute -left-[4px] top-48 w-[3px] h-16 bg-neutral-800 rounded-r-xs" />
          <div className="absolute -left-[4px] top-68 w-[3px] h-16 bg-neutral-800 rounded-r-xs" />
          <div className="absolute -right-[4px] top-44 w-[3px] h-20 bg-neutral-800 rounded-l-xs" />

          {/* Screen Area */}
          <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-gradient-to-b from-[#0d1424] to-[#040812] flex flex-col justify-between pt-12 pb-5 px-3 border border-neutral-900">
            
            {/* Status Bar */}
            <div className="absolute top-3 left-0 right-0 h-6 flex justify-between items-center px-8 text-[11px] font-semibold text-neutral-400/90 z-40 select-none">
              <span>09:41</span>
              <div className="flex items-center gap-1.5">
                {/* Signal Strength */}
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <rect x="2" y="16" width="3" height="4" rx="0.5" />
                  <rect x="7" y="12" width="3" height="8" rx="0.5" />
                  <rect x="12" y="8" width="3" height="12" rx="0.5" />
                  <rect x="17" y="4" width="3" height="16" rx="0.5" />
                </svg>
                {/* Wi-Fi Icon */}
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0-6a5.97 5.97 0 0 0-4.24-1.76 1 1 0 1 1 1.41-1.42A3.97 3.97 0 0 1 12 13a3.97 3.97 0 0 1 2.83-1.18 1 1 0 0 1 1.41 1.42A5.97 5.97 0 0 0 12 15Zm0-6a9.96 9.96 0 0 0-7.07-2.93 1 1 0 1 1 1.41-1.42A7.96 7.96 0 0 1 12 7c2.21 0 4.21-.9 5.66-2.35a1 1 0 1 1 1.41 1.42A9.96 9.96 0 0 0 12 9Z" />
                </svg>
                {/* Battery Icon */}
                <div className="w-5.5 h-3 border border-neutral-400/90 rounded-xs p-0.5 flex items-center">
                  <div className="bg-neutral-400/90 h-full w-[90%] rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Wallet Header */}
            <div className="text-center my-1 select-none">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059] opacity-95">
                Carteira Digital Maçônica
              </span>
            </div>

            {/* 3D Card Container (Resized wider, 380x537px - PDF standard aspect ratio) */}
            <div className="flex-grow flex items-center justify-center">
              <div
                className="w-[380px] h-[537px] perspective-1000 cursor-pointer"
                onClick={() => setFlipped(!flipped)}
              >
                {/* Card Flipper wrapper */}
                <div
                  className={`relative w-full h-full duration-700 preserve-3d ${
                    flipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* FRONT OF THE CARD */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-gradient-to-b from-[#FCFAF6] to-[#F5F2E9] border-2 border-[#C5A059] shadow-elegant backface-hidden flex flex-col justify-between overflow-hidden">
                    {/* Background watermark */}
                    <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
                      <img src={logoUrl} alt="Watermark" className="w-[110%] h-[110%] object-contain" />
                    </div>

                    {/* Top Bar / Header */}
                    <div className="relative z-10 flex items-center justify-between border-b border-[#C5A059]/40 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <img src={logoUrl} alt="Brasão" className="h-9 w-9 drop-shadow-[0_0_4px_rgba(197,160,89,0.3)]" />
                        <div>
                          <h3 className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] leading-none font-bold">A.R.L.S.</h3>
                          <h2 className="font-display text-xs font-bold text-[#0C1938] leading-tight">União Fraternal Nº 1</h2>
                          <p className="text-[7px] uppercase tracking-[0.05em] text-muted-foreground">Oriente de Praia Grande</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-[#137333]/10 text-[#137333] border border-[#137333]/20 tracking-wider uppercase">
                          Membro Regular
                        </span>
                      </div>
                    </div>

                    {/* Profile Section */}
                    <div className="relative z-10 flex flex-col items-center my-auto">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 rounded-xl border border-[#C5A059]/50 rotate-3 scale-105 pointer-events-none" />
                        <div className="absolute inset-0 rounded-xl border border-[#C5A059]/50 -rotate-3 scale-105 pointer-events-none" />
                        <div className="w-28 h-28 rounded-xl overflow-hidden border border-[#C5A059] relative z-10 shadow-sm bg-black/5 flex items-center justify-center">
                          {member.photo ? (
                            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-display text-[#C5A059] text-3xl">G</span>
                          )}
                        </div>
                      </div>

                      {/* Name & Role */}
                      <h2 className="font-display text-xl text-center text-[#0C1938] leading-snug font-bold mb-1">
                        {member.name}
                      </h2>
                      <p className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold mb-4">
                        {member.role}
                      </p>

                      {/* Card Details grid */}
                      <div className="w-full grid grid-cols-2 gap-3 border-t border-b border-[#C5A059]/30 py-3.5 px-2.5 bg-[#F3EFE4]/35 rounded-xl text-left">
                        <div>
                          <p className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground mb-0.5">Iniciação</p>
                          <p className="text-xs text-[#0C1938] font-bold">{member.initiationDate}</p>
                        </div>
                        <div>
                          <p className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground mb-0.5">CIM Número</p>
                          <p className="text-xs text-[#0C1938] font-bold">{member.cim}</p>
                        </div>
                        {member.office && (
                          <div className="col-span-2 border-t border-[#C5A059]/15 pt-2">
                            <p className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground mb-0.5">Cargo na Loja</p>
                            <p className="text-xs text-[#C5A059] font-bold">{member.office}</p>
                          </div>
                        )}
                        <div className="col-span-2 border-t border-[#C5A059]/15 pt-2">
                          <p className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground mb-0.5">E-mail</p>
                          <p className="text-xs text-[#0C1938] font-medium truncate">{member.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Bar / Footer */}
                    <div className="relative z-10 flex justify-between items-end border-t border-[#C5A059]/40 pt-2.5 text-muted-foreground text-[8px]">
                      <div>
                        <p className="uppercase tracking-[0.15em] text-[#C5A059] font-bold">G.·. A.·. D.·. U.·.</p>
                        <p className="mt-0.5 text-[7px] font-semibold text-[#0C1938]">Filiada ao G.O.M.B.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={gombLogoUrl} alt="Logo GOMB" className="h-8 w-8 object-contain" />
                      </div>
                    </div>
                  </div>

                  {/* BACK OF THE CARD */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-gradient-to-b from-[#FCFAF6] to-[#F5F2E9] border-2 border-[#C5A059] shadow-elegant backface-hidden rotate-y-180 flex flex-col justify-between overflow-hidden">
                    {/* Background watermark */}
                    <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
                      <img src={logoUrl} alt="Watermark" className="w-[110%] h-[110%] object-contain" />
                    </div>

                    {/* Top Bar / Header */}
                    <div className="relative z-10 flex items-center gap-2.5 border-b border-[#C5A059]/40 pb-2.5">
                      <img src={logoUrl} alt="Brasão" className="h-9 w-9 drop-shadow-[0_0_4px_rgba(197,160,89,0.3)]" />
                      <div>
                        <h2 className="font-display text-xs font-bold text-[#0C1938] leading-tight">União Fraternal Nº 1</h2>
                        <p className="text-[7px] uppercase tracking-[0.05em] text-[#C5A059]/90 font-bold">Validação Cadastral</p>
                      </div>
                    </div>

                    {/* QR Code Validation Section */}
                    <div className="relative z-10 flex flex-col items-center my-auto">
                      <div className="p-2 bg-white rounded-xl shadow-sm border border-[#C5A059]/30 mb-3 max-w-[150px]">
                        {qrUrl ? (
                          <img src={qrUrl} alt="QR Code" className="w-full h-auto" />
                        ) : (
                          <div className="w-32 h-32 bg-gray-100 animate-pulse rounded-lg" />
                        )}
                      </div>
                      <p className="text-[#C5A059] uppercase tracking-[0.15em] text-[8px] font-bold mb-0.5">
                        VALIDAÇÃO ELETRÔNICA
                      </p>
                      <p className="text-muted-foreground text-[8px] text-center max-w-[230px] leading-normal">
                        Use a câmera do celular para escanear o QR Code acima e consultar a autenticidade desta credencial.
                      </p>
                    </div>

                    {/* Signature Block */}
                    <div className="relative z-10 grid grid-cols-2 gap-3 border-t border-[#C5A059]/30 pt-3 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-serif italic text-[#C5A059] text-[10px] font-semibold leading-none mb-1">
                          Venerável Mestre
                        </span>
                        <span className="w-20 h-[0.5px] bg-[#C5A059]/30 mb-0.5" />
                        <span className="text-[6px] uppercase tracking-[0.1em] text-muted-foreground">Venerável Mestre</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-serif italic text-[#C5A059] text-[10px] font-semibold leading-none mb-1">
                          Secretário
                        </span>
                        <span className="w-20 h-[0.5px] bg-[#C5A059]/30 mb-0.5" />
                        <span className="text-[6px] uppercase tracking-[0.1em] text-muted-foreground">Secretário</span>
                      </div>
                    </div>

                    {/* Bottom Bar / Footer */}
                    <div className="relative z-10 flex justify-between items-end text-[7px] text-muted-foreground pt-1.5 border-t border-[#C5A059]/15">
                      <div>
                        <p className="text-[7px]">Fundação: 09/03/2024</p>
                        <p className="text-[6px] font-semibold text-[#0C1938] mt-0.5">Filiada ao G.O.M.B.</p>
                      </div>
                      <img src={gombLogoUrl} alt="Logo GOMB" className="h-6 w-6 object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet Footer Indicator */}
            <div className="text-center my-1 select-none flex flex-col items-center gap-1.5">
              <span className="text-[9px] text-neutral-400 font-medium tracking-wide">
                Toque no cartão para girar e ver o verso
              </span>
            </div>

            {/* Home Indicator */}
            <div className="w-32 h-1 bg-neutral-600 rounded-full mx-auto mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

